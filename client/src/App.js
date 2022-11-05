import React from "react";
import './App.scss'
import General from "./components/MainGeneral/General";
import {Routes,Route} from "react-router-dom";
import {GeneralComponent} from "./components/RouteComponents/RouteComponents";
import Gallery from "./components/Gallery/Gallery";
import About from "./components/About/About";
import Expositions from "./components/Expositions/Expositions";
import AdminPanel from "./components/Admin-panel/Admin-panel";
import News from "./components/News/News";


function App() {

    setTimeout(() => {
        localStorage.removeItem('isVisited')
    },300000)


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
                </Route>
                <Route path="/exposition" element={<GeneralComponent/>}>
                    <Route index element={<Expositions/>}/>
                </Route>
                <Route path="/news" element={<GeneralComponent/>}>
                    <Route index element={<News/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
