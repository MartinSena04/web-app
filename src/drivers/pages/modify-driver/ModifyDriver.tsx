import { useEffect, useState } from 'react';
import './ModifyDriver.css'
import { useNavigate } from 'react-router-dom';
import DriverService from '../../services/DriverService';
import { useParams } from 'react-router-dom';
import { FrontDriver, apiToFrontDriver } from '../../types/types';

export default function ModifyDriver() {

    const [driver, setDriver] = useState<FrontDriver>();

    const [stateSelected, setStateSelected] = useState('' as string);

    const navigate = useNavigate();

    const { id } = useParams();

    async function getDriver() {
        const driver = await DriverService.getById(id);
        const driverFront = apiToFrontDriver(driver);
        console.log(driverFront)
        setDriver(driverFront);
        setStateSelected(driverFront.state);
    }

    function handleStateChange(event) {
        event.preventDefault();
        const value = event.target.value;
        setStateSelected(value);
    }

    
    useEffect(() => {
        //peticion al servidor para obtener los datos del conductor
        getDriver();
    }, []);

    function handleConfirm(event) {

        event.preventDefault()
        //obtener los datos del formulario
        const data = new FormData(event.currentTarget);
        const state = data.get('state') as string;
        const isOnline = data.get('isOnline') as string;

        //checkear si hay cambios
        if (state === driver?.state) {
            navigate(-1);
            return;
        }


        //peticion al servidor para modificar los datos del conductor
        DriverService.updateDriver({'id':parseInt(id), state, isOnline })
            .then(() => {
                navigate(-1);
            })
            .catch((error) => {
                console.log(error);
            })
    }



    return (
        <form className="modify-driver" onSubmit={handleConfirm}>
            <div className='principal-data'>
                <div>
                    <span>telefono:</span>
                    <span>{driver?.cellphoneWork}</span>
                </div>
                <div>
                    <span>Estado:</span>
                    <select name="state" value={stateSelected} onChange={handleStateChange}>
                        <option value="">Todos</option>
                        <option value="started">Empezado</option>
                        <option value="pending_approval">Pendiente</option>
                        <option value="rejected">Rechazado</option>
                        <option value="suspended">Suspendido</option>
                        <option value="approved">Aprovado</option>
                    </select>
                </div>
                <div>
                    <span>Online</span>
                    <input type="checkBox" name='isOnline' />
                </div>
                <div>
                    <button type='submit'>Confirmar</button>
                    <button type='button' onClick={() => navigate(-1)}>Cancelar</button>
                </div>
            </div>
        </form>
    );
}