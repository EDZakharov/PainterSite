import React, {useEffect} from 'react';
import Cards from "./Cards/Cards";
import RoutesOutlet from "./Routes";
import CardEdit from "./Cards/Card-edit/Card-edit";
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Categories from "./Categories/Categories";
import Bio from "./Biography/Bio";

const AdminPanel = () => {

    const isLogoutStatus = useSelector(state => state.adminPanel.isLogoutStatus)

    useEffect(() => {
    },[isLogoutStatus])

    return (
        <>
            <Routes>
                <Route path="/" element={<RoutesOutlet/>}>
                    <Route index element={<Cards/>}/>
                    <Route path="/image" element={<CardEdit/>}/>
                </Route>
                <Route path="/categories" element={<RoutesOutlet/>}>
                    <Route index element={<Categories/>}/>
                </Route>
                <Route path="/bio" element={<RoutesOutlet/>}>
                    <Route index element={<Bio/>}/>
                </Route>
            </Routes>
        </>
    )
};

export default AdminPanel;