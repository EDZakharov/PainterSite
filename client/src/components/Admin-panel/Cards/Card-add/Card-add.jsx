import React from 'react';
import ImageName from "../../Forms/Image-name";
import style from './Card-add.module.scss'

const CardAdd = ({onSubmitHandler, fileChangeHandler, buttonHandler, buttonHandler2, textHandler, textChangeHandler}) => {
    return (
        <div className="add-card">
            <h4>Добавить изображение на сервер</h4>
            <form onSubmit={onSubmitHandler} name="image" className="add-card-form">
                <ImageName onChange={textChangeHandler} textHandler={textHandler}/>
                <div className={style.file_load_block}>
                    <input type="file" value="" id="file" onChange={fileChangeHandler} ref={buttonHandler}/>
                    <input type="text" defaultValue="Выберите файл..." ref={buttonHandler2}/>
                </div>
                <button className={`btn waves-effect waves-light ${style.button}`}
                        type="submit"
                        name="action">
                    <i className="material-icons">Отправить</i>
                </button>
            </form>

        </div>
    );
};

export default CardAdd;