import React, {useState} from 'react';
import Preloader from "../../../all/Preloader";
import {useLoginMutation} from "../../../../redux/api";
import style from './Login.module.scss'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login, {isLoading}] = useLoginMutation()

    return (
        <div className={style.login}>{isLoading ?
            <Preloader/> :
            <div>
                <h4>Панель администратора вход</h4>
                <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="text" onChange={e => setPassword(e.target.value)} placeholder="Password" />

                <button className={`btn waves-effect waves-light ${style.button}`}
                        type="submit"
                        name="action"
                        onClick={(e) => {
                            login({email, password})
                        }}>
                    <i className="material-icons">Войти</i>
                </button>
            </div>}
        </div>

    );
};

export default Login;