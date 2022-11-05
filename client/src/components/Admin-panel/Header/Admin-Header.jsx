import React from 'react';
import {Link} from "react-router-dom";
import {useLogoutMutation} from "../../../redux/api";
import {logout} from "../../../redux/toolkit";
import {useDispatch} from "react-redux";
import style from './AdminHeader.module.scss'


const AdminHeader = () => {

    const [trigger] = useLogoutMutation()
    const dispatch = useDispatch()

    const onBtnClick = (e) => {
        e.preventDefault()
        dispatch(logout())
        trigger()
    }

    return (
        <div className={style.header}>
            <nav>
                <div className="nav-wrapper">
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><Link className="nav-ul-li-span" to="/admin">Управление изображениями</Link></li>
                        <li><Link className="nav-ul-li-span" to="/admin/contacts">Управление контактами</Link></li>
                        <li><Link className="nav-ul-li-span" to="/admin/bio">Редактирование биографии</Link></li>
                        <li><Link className="nav-ul-li-span" to="/admin/news">Управление Новостями</Link></li>
                        <li><Link className="nav-ul-li-span" to="/admin/orders">Заказы (продажа картин)</Link></li>
                        <li><Link className="nav-ul-li-span" to="/painter">На сайт</Link></li>
                        <li><a className="nav-ul-li-span" onClick={onBtnClick}>Выход</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default AdminHeader;