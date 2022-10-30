import React from 'react';
import style from './Footer.module.scss'
import githubIcon from '../../assets/icons8-github-30.png'

const Footer = () => {
    return (
        <footer className={style.footer}>
            <section className={style.footer__data__wrapper}>
                <div className={style.privacy}>
                    <ul><a href="#">Пользовательское соглашение</a> на<br/>
                        обработку персональных данных
                    </ul>
                </div>
                <div className={style.info}>
                    <ul>Информация
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                    </ul>
                </div>
                <div className={style.gallery}>
                    <ul>Галерея работ
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                    </ul>
                </div>
                <div className={style.dzenStyle}>
                    <ul>Стиль Дзен
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
                        <li>1</li>
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