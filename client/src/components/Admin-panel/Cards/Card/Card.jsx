import React from 'react';
import PATH from "../../../../SERV_PATH";

const Card = ({spanEditClickHandler, name, imageSplitName, description}) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={`${PATH}images/` + name} height={'269px'}/>
                <span className="card-title">
                    <span className="text">{imageSplitName[2]}</span>
                </span>
            </div>
            <div className="card-content">
                <p>{description}</p>
            </div>
            <div className="card-action">
                <span onClick={spanEditClickHandler}>Редактировать</span>
            </div>
        </div>
    );
};

export default Card;