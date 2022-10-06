import React from "react";
import {Outlet} from "react-router-dom"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import style from './Routes.module.scss'

export const GeneralComponent = () => {
    localStorage.removeItem('currentEditImagePath')
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
            <div className={style.git}>
                <a href="https://github.com/EDZakharov">
                    <i className="fab fa-github"/> Github EDZakharov 2022 г.
                </a>
            </div>
        </>

    )
}
