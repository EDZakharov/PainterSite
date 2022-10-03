import React from 'react';
import style from './GalleryVelvet.module.scss'

const GalleryVelvet = ({image,type,material,description,name,sizes,width,height}) => {
    return (
        <div className={style.galleryVelvet}>
            <img src={image} width={width} height={height}/>
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

export default GalleryVelvet;