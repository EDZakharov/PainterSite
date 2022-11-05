import React from 'react';
import style from './Card-add.module.scss'
import React_Select from "../../../Selectors/React-Select/React-select";


const CardAdd = ({
                     categoriesHandler,
                     onCategoriesSelectHandler,
                     onSubmitHandler,
                     fileChangeHandler,
                     inpFileHandler,
                     inpFileHandler2,
                     name,
                     setName,
                     description,
                     setDescription,
                     setSizes,
                     sizes,
                 }) => {





    return (
        <div className="add-card">
            <h4>Добавить изображение на сервер</h4>
            <form onSubmit={onSubmitHandler} name="image" className="add-card-form">
                <div className="input-field">
                    <input id="image_name2" type="text" className="validate" placeholder="Введите название картины"
                           onChange={(e) => {
                               setName(e.target.value)
                           }}
                           value={name}/>
                    <input id="image_name1" type="text" className="validate" placeholder="Введите описание картины"
                           onChange={(e) => {
                               setDescription(e.target.value)
                           }}
                           value={description}/>
                    <input id="image_name3" type="text" className="validate" placeholder="Введите размер картины"
                           onChange={(e) => {
                               setSizes(e.target.value)
                           }}
                           value={sizes}/>
                    <React_Select onCategoriesSelectHandler={onCategoriesSelectHandler}
                                  categoriesHandler={categoriesHandler}
                    />
                </div>
                <div className={style.file_load_block}>
                    <input type="file" value="" id="file" onChange={fileChangeHandler}
                           ref={inpFileHandler}/>
                    <input type="text" defaultValue="Выберите файл..." ref={inpFileHandler2}/>
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