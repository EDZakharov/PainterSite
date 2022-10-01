import React from "react";
import './App.scss'
import General from "./components/MainGeneral/General";
import Footer from "./components/Footer/Footer";
import {Routes,Route} from "react-router-dom";
import {GeneralComponent} from "./components/RouteComponents/RouteComponents";
import Gallery from "./components/Gallery/Gallery";
import About from "./components/About/About";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/painter" element={<GeneralComponent/>}>
                    <Route index element={<General/>}/>
                </Route>
                <Route path="/about" element={<GeneralComponent/>}>
                    <Route index element={<About/>}/>
                </Route>
                <Route path="/gallery" element={<GeneralComponent/>}>
                    <Route index element={<Gallery/>}/>
                    <Route path="1" element={<div><Gallery/>тут будут картинки и описание1</div>}/>
                    <Route path="2" element={<div><Gallery/>тут будут картинки и описание2</div>}/>
                    <Route path="3" element={<div><Gallery/>тут будут картинки и описание3</div>}/>
                </Route>
                <Route path="/exposition" element={<GeneralComponent/>}>
                    <Route index element={<div>exposition</div>}/>
                </Route>
                <Route path="/shop" element={<GeneralComponent/>}>
                    <Route index element={<div>shop</div>}/>
                </Route>
            </Routes>
            <Footer/>
            <div className="git">
                <a href="https://github.com/EDZakharov">
                    <i className="fab fa-github"/> Github EDZakharov 2022 г.
                </a>
            </div>
        </div>
    );
}

export default App;
