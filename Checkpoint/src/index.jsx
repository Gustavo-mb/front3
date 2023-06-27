import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import App from "./App";
import "./index.css";
import Detail from "./Routes/Detail";
import Login from "./Routes/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
//Lembre-se de configurar suas rotas e seu contexto aqui
root.render(
   <BrowserRouter>
    
    <Routes>


      <Route path="/"  element= {<App/>}>
      <Route path="/Home"  element= {<Home/>}/>
      <Route path="/Login"  element= {<Login/>}/>
      <Route path="/Detail"  element= {<Detail/>}/>
      
      </Route>
      
     

    </Routes>
    
   </BrowserRouter>
);
