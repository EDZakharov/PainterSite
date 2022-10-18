import React from 'react';
import PATH from "../../../../SERV_PATH";
import style from './Card.module.scss'


const Card = ({spanEditClickHandler, name, imageSplitName, description}) => {
    return (
        <div className={style.card}>
            <div className={style.card_image}>
                <img src={`${PATH}images/` + name } height={'269px'}/>
                <span className={style.card_tittle}>{imageSplitName[2]}</span>
            </div>
            <div className={style.card_content}>
                <div className={style.content_description}>{description}</div>
            </div>
            <div className={style.action}>
                <span onClick={spanEditClickHandler} className={style.action_button}>Редактировать</span>
            </div>
        </div>
    );
};

export default Card;