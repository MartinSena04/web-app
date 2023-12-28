import { Route, Routes } from "react-router-dom";
import './home.css';
import AsideNavBar from "../../components/aside-navbar/AsideNavBar";
import Header from "../../components/header/Header";
import Drivers from "../../../drivers/pages/drivers/Drivers";

export default function Home() {
    return (
        <section className="home">
            <AsideNavBar/>
            <Header/>
            <main>
                <Routes>
                    <Route path="conductores/*" Component={Drivers}></Route>   
                </Routes>
            </main>
        </section>
    );
}