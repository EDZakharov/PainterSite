import React from 'react';
import {Link} from "react-router-dom";

const AdminHeader = () => {
    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo center">Панель администратора</a>
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><Link className="nav-ul-li-span" to="/admin">Управление изображениями</Link></li>
                        <li><Link className="nav-ul-li-span" to="/admin/categories">Управление категориями</Link></li>
                        <li><Link className="nav-ul-li-span" to="/admin/bio">Редактирование биографии</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default AdminHeader;