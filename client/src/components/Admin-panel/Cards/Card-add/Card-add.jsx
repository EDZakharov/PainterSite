import React from 'react';
import style from './Card-add.module.scss'
import React_Select from "../../../Selectors/React-Select/React-select";


const CardAdd = ({
                     categoriesHandler,
                     onCategoriesSelectHandler,
                     onSubmitHandler,
                     fileChangeHandler,
                     buttonHandler,
                     buttonHandler2,
                     textChangeHandler,
                     onSizesSelectHandler,
                     sizesHandler,
                     description,
                     name,
                     onNameChange,
                 }) => {
    return (
        <div className="add-card">
            <h4>Добавить изображение на сервер</h4>
            <form onSubmit={onSubmitHandler} name="image" className="add-card-form">
                <div className="input-field">
                    <input id="image_name2" type="text" className="validate" placeholder="Введите название картины"
                           onChange={onNameChange}
                           value={name}/>
                    <input id="image_name1" type="text" className="validate" placeholder="Введите описание картины"
                           onChange={textChangeHandler}
                           value={description}/>
                    <React_Select onCategoriesSelectHandler={onCategoriesSelectHandler}
                                  categoriesHandler={categoriesHandler}
                                  onSizesSelectHandler={onSizesSelectHandler}
                                  sizesHandler={sizesHandler}
                    />
                </div>
                <div className={style.file_load_block}>
                    <input type="file" value="" id="file" onChange={fileChangeHandler}
                           ref={buttonHandler}/>
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