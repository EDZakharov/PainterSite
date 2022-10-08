import React, {useEffect} from 'react';
import Login from "./Login/Login";
import {useSelector} from "react-redux";



const Auth = ({children}) => {
    const token = useSelector(state => state.adminPanel.accessToken)
    const localToken = localStorage.getItem('accessToken')

    useEffect(() => {

    },[localToken])


    if (!token && !localToken) {
        return <Login/>
    }
    return (
        <>
            {children}
        </>
    );
};

export default Auth;