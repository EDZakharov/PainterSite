import React from 'react';
import './Admin.css'
import Cards from "./Cards/Cards";
import RoutesOutlet from "./Routes";
import CardEdit from "./Cards/Card-edit/Card-edit";
import {Route, Routes} from "react-router-dom";

const AdminPanel = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<RoutesOutlet/>}>
                    <Route index element={<Cards/>}/>
                    <Route path="/image" element={<CardEdit/>}/>
                </Route>
                <Route path="/categories" element={<RoutesOutlet/>}>
                    <Route index element={<div>Categories</div>}/>
                </Route>
                <Route path="/bio" element={<RoutesOutlet/>}>
                    <Route index element={<div>Bio</div>}/>
                </Route>
            </Routes>
        </>
    )
};

export default AdminPanel;