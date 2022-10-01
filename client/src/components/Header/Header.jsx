import React from "react";
import style from './Header.module.scss'
import logo from '../../assets/favicon.ico'
import {NavLink} from "react-router-dom";

const Header = () => {
    let onClickActiveStatus = ({isActive}) => (isActive ? style.active : 'inactive');
    let menuList = [
        {id: 1, href: '/painter', text: 'Главная'},
        {id: 2, href: '/about', text: 'О художнике'},
        {id: 3, href: '/gallery', text: 'Галерея работ'},
        {id: 4, href: '/exposition', text: 'Онлайн выставки'},
        {id: 5, href: '/shop', text: 'Магазин'},

    ]

    return (
        <header className={style.header}>
            <section className={style.container}>
                <img src={logo} alt='logo'/>
                <div className={style.links}>
                    <nav>
                        {menuList ? menuList.map(el =>
                            <NavLink key={el.id} to={el.href} className={onClickActiveStatus}>{el.text}</NavLink>):''}
                    </nav>
                </div>
                <div className={style.contacts}>
                    <span>+7 (889) 745-48-45</span>
                    <div className={style.messengers}>
                        <a href="#"><p>Telegram</p></a>
                        <a href="#"><p>WhatsApp</p></a>
                    </div>
                    <button>Обратная связь</button>
                </div>
            </section>


        </header>
    )
}

export default Header;