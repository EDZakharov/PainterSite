import React from "react";
import style from './Gallery.module.scss'
import GalleryVelvet from "../GalleryVelvet/GalleryVelvet";
import {useGetImagesQuery, useSetImageMutation} from '../../redux/redux-query'
import {useState} from "react";

const Gallery = () => {
    const [fileData, setFileData] = useState("")
    const {data = [], isLoading, isSuccess, isError} = useGetImagesQuery()

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0]);
    }
    const [setImages] = useSetImageMutation()
    const onSubmitHandler = (e) => {
        e.preventDefault()
        setImages(fileData)
    };


    let [link1State, setLink1State] = useState(true)
    let [link2State, setLink2State] = useState(false)
    let [link3State, setLink3State] = useState(false)


    const onchangeState1 = () => {
        setLink1State(true)
        setLink2State(false)
        setLink3State(false)
    }
    const onchangeState2 = () => {
        setLink1State(false)
        setLink2State(true)
        setLink3State(false)
    }
    const onchangeState3 = () => {
        setLink1State(false)
        setLink2State(false)
        setLink3State(true)
    }

    let menuList = [
        {
            id: 1, onClick: onchangeState1,
            className: link1State ? style.active : '',
            text: 'Картины на бархатной бумаге'
        },
        {
            id: 2, onClick: onchangeState2,
            className: link2State ? style.active : '',
            text: 'Картины на бумаге'
        },
        {
            id: 3, onClick: onchangeState3,
            className: link3State ? style.active : '',
            text: 'Картины на шёлке'
        }
    ]

    const getJSX = () => {
        if(isLoading) {return <h2>Загрузка...</h2>}
        if(isSuccess) {return data.map(el => {
            return <GalleryVelvet key={el._id} image={el.name} width={'339px'} height={'469px'}/>
        })}
    }


    return (
        <div className={style.gallery}>
            <div className={style.wrapper}>
                <div className={style.typeList}>
                    <div className={style.selection}>
                        {menuList.map(el => <span key={el.id} onClick={el.onClick}
                                                  className={el.className}>{el.text}</span>)}
                    </div>{isError ? <h2>Ошибка заргузки картинок</h2> : getJSX()}
                    {link2State && <div className={style.two}>В разработке...</div>}
                    {link3State && <div className={style.three}>В разработке...</div>}
                    <div className="container">
                        <h1>File Upload</h1>
                        <form onSubmit={onSubmitHandler} name="image">
                            <input type="file" onChange={fileChangeHandler}/>
                            <button type="submit" className="profile-order-button">
                                Загрузить на сервер
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;