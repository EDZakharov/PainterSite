import React, {useState} from 'react';
import style from "./newsCard.module.scss";
import PATH from "../../../SERV_PATH";
import {usePatchNewsMutation,useDeleteNewsMutation} from "../../../redux/api";

const NewsCard = ({el}) => {
    const [edit, setEdit] = useState(false)
    const [setData] = usePatchNewsMutation()
    const [deleteData] = useDeleteNewsMutation()
    const [area1Value, setArea1Value] = useState(el.shortDescription)
    const [area2Value, setArea2Value] = useState(el.date)
    const [area3Value, setArea3Value] = useState(el.title)
    const [area4Value, setArea4Value] = useState(el.longDescription)

    const onEdit1BtnClick = (e) => {
        setEdit(!edit)
    }

    return (
        <div className={style.news}>
            <div className={style.news__image}>
                <img src={`${PATH}images/` + el.imageSrc} alt="news-logo"/>
                {!edit ? <span>{el.shortDescription}</span> :
                    <textarea value={area1Value}
                              onInput={(e) => {
                                  setArea1Value(e.target.value)
                              }}/>}
                {!edit ? <button onClick={onEdit1BtnClick}>{!edit && "Редактировать"}</button>
                    : <div className={style.edit__buttons}>
                        <button onClick={() => {
                            setEdit(!edit)
                            setData({
                                id: el._id,
                                shortDescription: area1Value,
                                date: area2Value,
                                title: area3Value,
                                longDescription: area4Value,
                            })
                        }}>{edit && "Подтвердить"}</button>
                        <button onClick={() => {
                            setEdit(!edit)
                            deleteData({
                                id:el._id
                            })
                        }}>Удалить новость</button>
                    </div>}
            </div>
            <div className={style.news__data}>
                <span className={style.data__span__bold}>Дата:</span>
                {!edit ? <span>{el.date}</span> :
                    <textarea value={area2Value}
                              onInput={(e) => {
                                  setArea2Value(e.target.value)
                              }}/>}
                <span className={style.data__span__bold}>Название:</span>
                {!edit ? <span>{el.title}</span> :
                    <textarea value={area3Value}
                              onInput={(e) => {
                                  setArea3Value(e.target.value)
                              }}/>}
                <span className={style.data__span__bold}>Описание:</span>
                {!edit ? <span>{el.longDescription}</span> : <textarea
                    style={{height: "100%"}}
                    value={area4Value}
                    onInput={(e) => {
                        setArea4Value(e.target.value)
                    }}
                />}
            </div>
        </div>
    );
};

export default NewsCard;