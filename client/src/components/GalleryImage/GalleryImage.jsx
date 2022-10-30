import React from 'react';
import style from './GalleryImage.module.scss'
import PATH from '../../SERV_PATH'
import ModalImage from "../Modal/Modal-Image/Modal-image";

const ImagesList = ({image}) => {
    return (
        <div className={style.galleryVelvet}>
            <div className={style.modal}>
                <ModalImage imageProps={image}>
                    <img src={`${PATH}images/` + image.name}/>
                </ModalImage>
            </div>
            <div className={style.imageData}>
                <span><span className={style.boldFont}>Название:</span> {image.imageName}</span>
                <span><span className={style.boldFont}>Размер:</span> {image.sizes} см</span>
                <span><span className={style.boldFont}>Описание:</span> {image.description}</span>
            </div>
        </div>
    );
};

export default ImagesList;