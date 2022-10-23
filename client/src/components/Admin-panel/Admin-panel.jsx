import React, {useEffect} from 'react';
import Cards from "./Cards/Cards";
import RoutesOutlet from "./Routes";
import CardEdit from "./Cards/Card-edit/Card-edit";
import {Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Contacts from "./Contacts/Contacts";
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
                <Route path="/contacts" element={<RoutesOutlet/>}>
                    <Route index element={<Contacts/>}/>
                </Route>
                <Route path="/bio" element={<RoutesOutlet/>}>
                    <Route index element={<Bio/>}/>
                </Route>
            </Routes>
        </>
    )
};

export default AdminPanel;