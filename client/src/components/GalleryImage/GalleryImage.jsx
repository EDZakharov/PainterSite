import React from 'react';
import style from './GalleryImage.module.scss'
import PATH from '../../SERV_PATH'
import ModalImage from "../Modal/Modal-Image/Modal-image";

const ImagesList = ({image, type, material, description, name, sizes, width, height}) => {
    return (
        <div className={style.galleryVelvet}>
            <ModalImage>
                <img src={`${PATH}images/` + image} width={width} height={height}/>
            </ModalImage>
            {/*<div className={style.info}>*/}
            {/*    <span>{name}</span>*/}
            {/*    <span>{type}</span>*/}
            {/*    <span>{material}</span>*/}
            {/*    <span>{sizes}</span>*/}
            {/*    <span>{description}</span>*/}
            {/*</div>*/}
        </div>
    );
};

export default ImagesList;