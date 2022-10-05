import React from 'react';
import './Admin.css'
import Card from "./Card-image/Card";
import {Route, Routes} from "react-router-dom";
import RoutesOutlet from "./Routes";

const AdminPanel = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<RoutesOutlet/>}>
                    <Route index element={<div><Card/></div>}/>
                </Route>
                <Route path="/categories" element={<RoutesOutlet/>}>
                    <Route index element={<div>Categories</div>}/>
                </Route>
                <Route path="/bio" element={<RoutesOutlet/>}>
                    <Route index element={<div>Bio</div>}/>
                </Route>
            </Routes>
        </div>
    )
};

export default AdminPanel;