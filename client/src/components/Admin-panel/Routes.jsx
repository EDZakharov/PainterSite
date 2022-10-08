import React from 'react';
import AdminHeader from "./Header/Admin-Header";
import {Outlet} from "react-router-dom";
import Auth from "./Auth/Auth";

const RoutesOutlet = () => {
    return (
        <div>
            <Auth>
                <AdminHeader/>
                <Outlet/>
            </Auth>
        </div>
    );
};

export default RoutesOutlet;