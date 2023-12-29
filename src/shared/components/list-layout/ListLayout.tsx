import { ChangePageSize } from '../../utilites/ChangePageSize';
import './ListLayout.css';
import { useEffect, useRef } from 'react';

export default function ListLayout({children, page, pageSize, setPageSize, setPage, total, data, setTotal, setData, filters, filterData, setNoResults, noResults, loading, setLoading}){

    const isPageChange = useRef(false)
    function forward(){
        if(page === 1) return
        setPage(page - 1)
    }

    function backward(){
        if(page*pageSize >= total) return
        setPage(page + 1)
    }

    useEffect(() => {

        if (page*pageSize > total && total > 0) {
            setPage(Math.ceil(total/pageSize))
        }
        if (!data[page])return

        if (data[page].length < pageSize && page*pageSize <= total){
            console.log('cambio de tamaño')
            
            filterData(page, (page-1)*pageSize, setData,filters, pageSize, setTotal, true, setNoResults, setLoading)
        }


        setData(ChangePageSize(data, pageSize))
    }, [pageSize])

    useEffect(() => {

        if (!isPageChange.current) {
            isPageChange.current = true
            return
        }

        if (!data[page] || (data[page].length < pageSize && page*pageSize <= total)) {
            console.log('cambio de pagina')
            filterData(page, (page-1)*pageSize, setData,filters, pageSize, setTotal,false, setNoResults, setLoading)
        }
    }, [page])
    
    return (
        <section className="list-layout">
            <div className = "drivers-headers">
                <div>
                    <select value={pageSize} name="nroDrivers" id="nro-drivers" onChange={(event) => setPageSize(event.target.value)}>
                        <option value="3" >3 por pagina</option>
                        <option value="5" >5 por pagina</option>
                        <option value="7" >7 por pagina</option>
                    </select>
                </div>
            </div>
            {children}
            {loading && <div>Cargando...</div>}
            {noResults && <div className="no-drivers">
                <p>No se encontraron resultados</p>
                </div>}
            {Object.keys(data).length > 0 && <div className="pagination">
                <div>
                    <p>Mostrando {((page-1)*pageSize) + 1} a {page*pageSize > total? total : page*pageSize} de {total}</p>
                </div>
                <div>
                    <button onClick={forward}>Anterior</button>
                    <button onClick={backward}>Siguiente</button>
                </div>
            </div>}
        </section>
    )
}