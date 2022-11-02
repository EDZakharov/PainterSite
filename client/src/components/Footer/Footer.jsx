import React from 'react';
import style from './Footer.module.scss'
import githubIcon from '../../assets/icons8-github-30.png'
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className={style.footer}>
            <section className={style.footer__data__wrapper}>
                <div className={style.privacy}>
                    <ul><a href="#">dzenstyle.ru</a> 2022 г.<br/>
                    Все права защищены
                    </ul>
                </div>
                <div className={style.info}>
                    <ul>Информация:
                        <li><Link to="/news">Новости</Link></li>
                        <li><Link to="/about">О художнике</Link></li>
                        <li><Link to="/gallery">Галерея работ</Link></li>
                        <li><a href="http://xn--80acdh9aghi5b0f8a.xn--p1ai/">Старая версия сайта</a></li>
                    </ul>
                </div>
                <div className={style.contacts}>
                    <ul>Контакты:
                        <li><a href="#">По вопросам сотрудничества</a></li>
                        <li><a href="#">Telegram</a></li>
                        <li><a href="#">WhatsApp</a></li>
                    </ul>
                </div>
                <div className={style.questions}>
                    <ul>Часто задаваемые вопросы:
                        <li><a href="#">Что такое стиль дзен?</a></li>
                        <li><a href="#">Как приобрести работу?</a></li>
                        <li><a href="#">Как узнать о предстоящей выставке?</a></li>
                    </ul>
                </div>
            </section>
            <div className={style.git}>
                <a href="https://github.com/EDZakharov">
                    <img src={githubIcon} alt="github"/>
                </a>
            </div>
        </footer>
    );
};

export default Footer;