import React from 'react';
import {Link} from "react-router-dom";
import {useLogoutMutation} from "../../../redux/api";




const AdminHeader = () => {

    const [trigger] = useLogoutMutation()

    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <ul id="nav-mobile" className="left hide-on-med-and-down">
                        <li><Link className="nav-ul-li-span" to="/admin">Управление изображениями</Link></li>
                        <li><Link className="nav-ul-li-span" to="/admin/categories">Управление категориями</Link></li>
                        <li><Link className="nav-ul-li-span" to="/admin/bio">Редактирование биографии</Link></li>
                        <li><Link className="nav-ul-li-span" to="/painter">На сайт</Link></li>
                        <li><a className="nav-ul-li-span" onClick={(e) => {
                            e.preventDefault()
                            trigger()
                        }}>Выход</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default AdminHeader;