import React, {useEffect, useState} from "react";
import style from './Header.module.scss'
import logo from '../../assets/favicon.ico'
import {NavLink} from "react-router-dom";
import {useGetContactsQuery} from "../../redux/api";
import ModalContacts from "../Modal/Modal-contacts/Modal-contacts";


const Header = () => {
    const {data, isLoading} = useGetContactsQuery()
    let onClickActiveStatus = ({isActive}) => (isActive ? style.active : 'inactive');
    const [status, setStatus] = useState(false)
    let menuList = [
        {id: 1, href: '/painter', text: 'Главная'},
        {id: 2, href: '/about', text: 'О художнике'},
        {id: 3, href: '/gallery', text: 'Галерея'},
        {id: 4, href: '/news', text: 'Новости'},
        // {id: 4, href: '/exposition', text: 'Онлайн выставки'},
        // {id: 5, href: '/shop', text: 'Магазин'},
    ]

    return (
        <header className={style.header}>
            <section className={style.container}>
                <img src={logo} alt='logo'/>
                <div className={style.hamburger_menu}>
                    <div className={style.menu_btn} onClick={(e) => {
                            setStatus(!status)
                        }}>
                        {status ? <span className={style.activeSpan}/> : <span className={style.disactiveSpan}/>}
                        </div>
                    {status && <ul>
                        {menuList ? menuList.map(el =>
                            <li key={el.id}><NavLink to={el.href} onClick={()=>{
                                window.scrollTo(0, 0);
                                setStatus(!status)
                            }}>{el.text}</NavLink></li>) : ''}
                    </ul>}

                </div>
                <div className={style.links}>
                    <nav>
                        {menuList ? menuList.map(el =>
                            <NavLink key={el.id} to={el.href} className={onClickActiveStatus} onClick={()=>{
                                window.scrollTo(0, 0);
                                setStatus(!status)
                            }}>{el.text}</NavLink>) : ''}
                    </nav>
                </div>
                <div className={style.contacts}>
                    <span>{isLoading ? '' : data ? `+ 
                    ${data[0].contacts.phone.slice(0, 1)}
                    (${data[0].contacts.phone.slice(1, 4)})
                    ${data[0].contacts.phone.slice(4, 7)}-${data[0].contacts.phone.slice(7, 9)}-${data[0].contacts.phone.slice(9, 11)}` : '+7 (906) 248-39-71'}</span>
                    <div className={style.messengers}>
                        <a href={isLoading ? '#' : data ? data[0].contacts.telegram : '#'}><p>Telegram</p></a>
                        <a href={isLoading ? '#' : data ? data[0].contacts.whatsApp : '#'}><p>WhatsApp</p></a>
                    </div>
                    <ModalContacts/>
                </div>
            </section>
        </header>
    )
}

export default Header;