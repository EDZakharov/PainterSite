import React from 'react';
import {Outlet} from "react-router";
import AdminHeader from "./Header/Admin-Header";

const RoutesOutlet = () => {
    return (
        <div>
            <AdminHeader/>
            <Outlet/>
        </div>
    );
};

export default RoutesOutlet;