import React from 'react';
import style from './Card-add.module.scss'

const CardAdd = ({onSubmitHandler, fileChangeHandler, buttonHandler, buttonHandler2, textHandler, textChangeHandler, value}) => {
    return (
        <div className="add-card">
            <h4>Добавить изображение на сервер</h4>
            <form onSubmit={onSubmitHandler} name="image" className="add-card-form">
                <div className="input-field" >
                    <input id="image_name" type="text" className="validate"
                           onChange={textChangeHandler}
                           ref={textHandler}
                           value={value}/>
                    <label htmlFor="image_name">Введите описание изображения</label>
                </div>
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