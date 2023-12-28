import "./App.css";
import Login from "./auth/pages/login/Login";
import Splash from "./auth/pages/splash/Splash";
import Home from "./auth/pages/home/Home";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { initializeAxios } from "./config";

function App() {

  useEffect(() => {
    initializeAxios();
  }, []);

  return (
      <Routes>
        <Route path="/" Component={Splash}></Route>
        <Route path="/login" Component={Login}></Route>
        <Route path="/home/*" Component={Home}></Route>
      </Routes>
  );
}

export default App;
