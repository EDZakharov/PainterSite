import React from "react";
import './App.scss'
import General from "./components/MainGeneral/General";
import {Routes,Route} from "react-router-dom";
import {GeneralComponent} from "./components/RouteComponents/RouteComponents";
import Gallery from "./components/Gallery/Gallery";
import About from "./components/About/About";
import Expositions from "./components/Expositions/Expositions";
import AdminPanel from "./components/Admin-panel/Admin-panel";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/admin/*" element={<AdminPanel/>}/>
                <Route path="/" element={<GeneralComponent/>}>
                    <Route index element={<General/>}/>
                </Route>
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
                    <Route index element={<Expositions/>}/>
                </Route>
                <Route path="/shop" element={<GeneralComponent/>}>
                    <Route index element={<div>shop</div>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
