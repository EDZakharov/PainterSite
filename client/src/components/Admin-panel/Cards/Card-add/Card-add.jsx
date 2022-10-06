import React from 'react';

const CardAdd = ({onSubmitHandler,fileChangeHandler, buttonHandler, textHandler, textChangeHandler}) => {
    return (
        <div className="add-card">
            <h4>Добавить изображение на сервер</h4>
            <form onSubmit={onSubmitHandler} name="image">
                <input type="file" onChange={fileChangeHandler} ref={buttonHandler}/>
                <input type="text" onChange={textChangeHandler} ref={textHandler} placeholder="Введите описание"/>
                <button type="submit" className="profile-order-button" >
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default CardAdd;