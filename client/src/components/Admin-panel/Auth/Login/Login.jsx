import React, {useState} from 'react';
import Preloader from "../../../all/Preloader";
import {useLoginMutation} from "../../../../redux/api";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, {isLoading}] = useLoginMutation()

    return (
        <>{isLoading ?
            <Preloader/> :
            <div>
                <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                <input type="text" onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                <button onClick={(e) => {
                    e.preventDefault()
                    login({email, password})
                }}>Войти
                </button>
            </div>}
        </>

    );
};

export default Login;