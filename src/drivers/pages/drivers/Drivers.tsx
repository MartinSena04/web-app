import DriversProvider from "../../contexts/Drivers";
import { Route, Routes } from "react-router-dom";
import DriversList from "../drivers-list/DriversList";
import ModifyDriver from "../modify-driver/ModifyDriver";

export default function Drivers() {
    return (
        <DriversProvider>
            <Routes>
                <Route path="listado" Component={DriversList}></Route>
                <Route path="modificar/:id" Component={ModifyDriver}></Route>
                <Route path="eliminar/:id" Component={ModifyDriver}></Route>
            </Routes>
        </DriversProvider>
    );
}