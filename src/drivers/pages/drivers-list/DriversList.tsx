import { FiltersLayout } from "../../../shared/components/filters-layout/FiltersLayout";
import { useContext, useEffect, useRef, useState} from 'react'
import ListRowLayout from "../../../shared/components/list-row-layout/ListRowLayout";
import './DriversList.css'
import ListLayout from "../../../shared/components/list-layout/ListLayout";
import { useAppSelector, useAppDispatch } from "../../../shared/hooks/store";
import { updateFilters, deleteFilters } from "../../store-slice/DriversSlice";
import { DriversContext } from "../../contexts/Drivers";
import { debounce } from "../../../shared/utilites/debounce";
import DriverService from "../../services/DriverService";
import { FrontDriver, apiToFrontDriver } from "../../types/types";
import { createRoutesFromChildren } from "react-router-dom";

//TODOS:
// 1. Mostrar un loader mientras se hace la petición
// 2. 


const initialDrivers = {}

async function filtersDrivers(page, offset, setDrivers, filters, limit,setTotalDrivers, isfilterChange, setNoResults,setLoading) {

    //Si no hay filtros, no hacer la petición
    if (!filters.id && !filters.names && !filters.cellphoneWork && !filters.state) return

    //Crear el string de la url con los filtros
    const filtersString = Object.keys(filters).map((key) => {
        return `${key}=${filters[key]}`
    }).join('&')

    //Hacer la petición al servidor
    const data = await DriverService.getFilteredDrivers(filtersString, offset, limit, isfilterChange)

    setLoading(false)
    if (!data)return

    if (data.drivers.length === 0){
        setNoResults(true)
        setDrivers({})
        return
    }
    else setNoResults(false)

    if (data.total) setTotalDrivers(data.total)

    //Actualizar el estado de los drivers
    const newDrivers = data.drivers.map(apiToFrontDriver)

    const newData = {}
    newData[page] = newDrivers

    if (isfilterChange) setDrivers(newData)

    else setDrivers(state => ({...state, ...newData}))


}

const debouncedFiltersDrivers = debounce(filtersDrivers, 500)




export default function DriversList() {

    const { page, setPage, pageSize, setPageSize} = useContext(DriversContext)
    const [drivers, setDrivers] = useState(initialDrivers)	
    const [totalDrivers, setTotalDrivers] = useState(0)
    const [noResults, setNoResults] = useState(false)
    const [filterChange, setFilterChange] = useState(false)
    const [loading, setLoading] = useState(true)
    const [isFirstReload, setIsFirstReload] = useState(true)
    const filters = useAppSelector(state => state.drivers.filters)
    const dispatch = useAppDispatch()
    const isFirstRender = useRef(true)

    function checkIsFirstRender() {

        if (isFirstRender.current) {
            isFirstRender.current = false
            return true
        }
        return false
    }

    useEffect(() =>{
        filtersDrivers(page, (page-1)*pageSize, setDrivers, filters, pageSize, setTotalDrivers, true, setNoResults, setLoading)
    },[])

    useEffect(() => {
        if (checkIsFirstRender()) return
        setPage(1)
        setFilterChange(state => !state)

    },[filters])

    useEffect(() => {


        debouncedFiltersDrivers(page, (page-1)*pageSize, setDrivers, filters, pageSize, setTotalDrivers, true, setNoResults, setLoading)

    },[filterChange])


    function handleFiltersChange(event) {
        event.preventDefault()
        const { name, value } = event.target
        dispatch(updateFilters({name, value}))
    }

    function cleanFilters() {
        setPage(1)
        setDrivers(initialDrivers)
        setTotalDrivers(0)
        dispatch(deleteFilters())
    }

    return(
        <section className="drivers-list">
            <FiltersLayout cleanFilters={cleanFilters} >
                <input type="text" placeholder="Buscar por nombre" onChange={handleFiltersChange} name="id" value={filters.id}/>
                <input type="text" placeholder="Buscar por nombre" onChange={handleFiltersChange} name="names" value={filters.names}/>
                <input type="text" placeholder="Buscar por nombre" onChange={handleFiltersChange} name="cellphoneWork" value={filters.cellphoneWork}/>
                <select value={filters.state} onChange={handleFiltersChange}name="state">
                    <option value="">Todos</option>
                    <option value="started">Empezado</option>
                    <option value="pending_approval">Pendiente</option>
                    <option value="rejected">Rechazado</option>
                    <option value="suspended">Suspendido</option>
                    <option value="approved">Aprovado</option>
                </select>
            </FiltersLayout>
            <div>
                <button onClick={(event) => {
                        event.preventDefault()
                    }}>Buscar</button>
            </div>
            <ListLayout page={page} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} total={totalDrivers} setTotal={setTotalDrivers} setData={setDrivers} data={drivers} filterData={filtersDrivers} filters={filters} setNoResults={setNoResults} noResults={noResults} loading={loading} setLoading={setLoading} isFirstReload={isFirstReload}>
                <table className="drivers-table">
                    <thead> 
                        <tr className="drivers-header">
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers[page] ? drivers[page].map((driver) => (
                            <ListRowLayout id={driver.id}>
                                <td>{driver.id}</td>
                                <td>{driver.names}</td>
                                <td>{driver.state}</td>
                                <td>{driver.cellphoneWork}</td>
                            </ListRowLayout>
                        )):null}
                    </tbody>
                </table>
            </ListLayout>
        </section>
    )
}
