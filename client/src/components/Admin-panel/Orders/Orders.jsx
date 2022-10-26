import React from 'react';
import style from './Orders.module.scss'
import {useGetOrdersQuery} from "../../../redux/api";
import Preloader from "../../all/Preloader";

const Orders = () => {

    const {data, isLoading} = useGetOrdersQuery()

    return (
        <>
            {isLoading ? <Preloader/> : <div className={style.orders}>
                <div className={style.phone}>
                    <span>Номер телефона: </span>
                    {data && data.map(el => (
                        <div key={el._id}>
                            {el.usersContacts?.phone}
                        </div>))}
                </div>
                <div className={style.email}>
                    <span>Email: </span>
                    {data && data.map(el => (
                        <div key={el._id}>
                            {el.usersContacts?.email}
                        </div>))}
                </div>
                <div className={style.comment}>
                    <span>Комментарий: </span>
                    {data && data.map(el => (
                        <div key={el._id}>
                            {el.usersContacts?.comment}
                        </div>))}
                </div>
            </div>

            }
        </>
    );
};

export default Orders;