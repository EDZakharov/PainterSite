import React, {useEffect, useState} from 'react';
import style from "./Add-News.module.scss";
import {usePostNewsMutation} from "../../../redux/api";

const AddNews = () => {
    const [setData] = usePostNewsMutation()
    const [impValue1, setInpValue1] = useState('')
    const [impValue2, setInpValue2] = useState('')
    const [impValue3, setInpValue3] = useState('')
    const [impValue4, setInpValue4] = useState('')
    const [impValue5, setInpValue5] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault()
        setData({
            imageSrc:impValue1,
            shortDescription:impValue2,
            date:impValue3,
            title:impValue4,
            longDescription:impValue5,
        })
        setInpValue1('')
        setInpValue2('')
        setInpValue3('')
        setInpValue4('')
        setInpValue5('')
    }

    return (
        <div className={style.add__news}>
            <h4>Добавить новость:</h4>
            <form onSubmit={onFormSubmit}>
                <div className={style.form__addnews}>
                    <input type="text" placeholder="Введите название картинки:" value={impValue1} onChange={(e) => {
                        setInpValue1(e.target.value)

                    }}/>
                    <span>Название картинки вводить обязательно в формате: 04112022-224253_256-perehod.jpg.</span>
                    <span>Скопировать название картинки можно во вкладке "Управление изображениями"</span>
                    <input type="text" placeholder="Введите краткое описание новости" value={impValue2} onChange={(e) => {
                        setInpValue2(e.target.value)

                    }}/>
                    <input type="date" value={impValue3} onChange={(e) => {
                        setInpValue3(e.target.value)

                    }}/>
                    <input type="text" placeholder="Введите название новости" value={impValue4} onChange={(e) => {
                        setInpValue4(e.target.value)

                    }}/>
                    <input type="text" placeholder="Введите описание новости" value={impValue5} onChange={(e) => {
                        setInpValue5(e.target.value)

                    }}/>
                </div>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default AddNews;