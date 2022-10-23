import React from "react";
import {Outlet} from "react-router-dom"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export const GeneralComponent = () => {
    localStorage.removeItem('currentEditImagePath')
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>

    )
}
