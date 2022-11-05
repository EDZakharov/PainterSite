import React, {useEffect} from 'react';
import style from './News.module.scss'
import {useGetNewsQuery} from "../../redux/api";
import {useSelector} from "react-redux";
import PATH from "../../SERV_PATH";

const News = () => {
    const {} = useGetNewsQuery()
    const data = useSelector(state => state.adminPanel.news)

    useEffect(() => {
    },[data])

    return (
        <div className={style.news__wrapper}>
            {data? data.map(el => <div key={el._id}>
                <div className={style.news}>
                    <div className={style.news__image}>
                        <img src={`${PATH}images/` + el.imageSrc} alt="news-logo"/>
                        <span>{el.shortDescription}</span>
                    </div>
                    <div className={style.news__data}>
                        <span className={style.data__span__bold}>Дата:</span>
                        <span>{el.date}</span>
                        <span className={style.data__span__bold}>Название:</span>
                        <span>{el.title}</span>
                        <span className={style.data__span__bold}>Описание:</span>
                        <span>{el.longDescription}</span>
                    </div>
                </div>
            </div>):<div>Sorry</div>}
        </div>
    );
};

export default News;