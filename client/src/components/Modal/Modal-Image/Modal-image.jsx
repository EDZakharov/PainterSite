import React, {useState} from 'react';
import style from './Modal-image.module.scss'

const ModalImage = ({children, imageProps}) => {
    const [close, setClose] = useState(false)



    const openModal = () => {
        setClose(!close)
        document.querySelector('body').style.overflow = 'hidden'
    }

    const closeModal = () => {
        setClose(!close)
        document.querySelector('body').style.overflow = 'auto'
    }


    return (
        <>
            {!close ?
                <div className={style.imageWrapper}>
                    <img src={children.props.src}
                         onClick={openModal}
                    />
                </div>
                 : <div className={style.modal}>
                <div className={style.modal_content_wrapper}>
                    <img className={style.modal_image} src={children.props.src}
                         onClick={closeModal}/>
                    <span className={style.close} onClick={closeModal}/>
                </div>
            </div>}

        </>
    );
};

export default ModalImage;