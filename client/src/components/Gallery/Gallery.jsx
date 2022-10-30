import React from "react";
import style from './Gallery.module.scss'
import ImagesList from "../GalleryImage/GalleryImage";
import {useState} from "react";
import {useGetImageByCategoryNameQuery} from "../../redux/api";
import Preloader from "../all/Preloader";
import MenuSelectors from "../Selectors/Menu-Selectors/Menu-selectors";

const Gallery = () => {
    const [menuPos, setMenuPos] = useState(1)
    const {data = [], isLoading, isSuccess, isError} = useGetImageByCategoryNameQuery(menuPos)

    const menuPosChecker = (position) => {
        setMenuPos(position)
    }

    const menuPosSwitcher = (pos) => {
        if (!pos) {
            return <Preloader/>
        }
        if (pos === 1 || pos === 2 || pos === 3) {
            return data.map(el => {
                return <ImagesList key={el._id} image={el}/>
            })
        }
    }

    return (
        <div className={style.gallery}>
            <div className={style.gallery__nav}>
                <MenuSelectors menuPosChecker={menuPosChecker}/>
            </div>
            <div className={style.gallery__images__wrapper}>
                {isLoading ? <Preloader/> :
                    isSuccess ? menuPosSwitcher(menuPos) :
                        isError ? <div>Ошибка при загрузке картинок...</div> :
                            <div>Что-то пошло не так...</div>}
            </div>
        </div>
    );
};

export default Gallery;