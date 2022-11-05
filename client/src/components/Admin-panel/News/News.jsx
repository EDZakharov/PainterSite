import React, {useEffect, useState} from 'react';
import style from './News.module.scss'
import AddNews from "./Add-News";
import {useGetNewsQuery} from "../../../redux/api";

import {useSelector} from "react-redux";
import NewsCard from "./newsCard";

const News = () => {

    const {} = useGetNewsQuery()
    const data = useSelector(state => state.adminPanel.news)

    useEffect(() => {
    }, [data])

    return (
        <div className={style.news__wrapper}>
            <h3>Управление новостями</h3>
            <div>
                <AddNews/>
                <h4>Список новостей:</h4>
                {data && data?.length !== 0 ?
                    data.map(el => <NewsCard key={el._id} el={el}/>)
                    :
                    <div style={{textAlign:"center"}}>Здесь пока пусто</div>}
            </div>
        </div>
    );
};


export default News;