import React from 'react';
import PATH from "../../../../SERV_PATH";
import style from './Card.module.scss'


const Card = ({spanEditClickHandler, name, description, imageName,sizes, category}) => {
    return (
        <div className={style.card}>
            <div className={style.card_image}>
                <img src={`${PATH}images/` + name } height={'269px'}/>
                <span className={style.card_tittle}>Название: {imageName}</span>

            </div>
            <div className={style.card_content}>
                <div className={style.content_description}>Размер: {sizes} см</div>
                <div className={style.content_description}>Описание: {description}</div>
                <div className={style.content_description}>Категория: {category}</div>
                <div className={style.card_tittle}>Название картинки на сервере: {name}</div>
            </div>
            <div className={style.action}>
                <span onClick={spanEditClickHandler} className={style.action_button}>Редактировать</span>
            </div>
        </div>
    );
};

export default Card;