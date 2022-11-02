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


    const setSizes = (sizes, pars = '', where = 'default') => {

        const screenWidth = window.screen.width
        const screenHeight = window.screen.height

        if (!sizes) {
            return 0
        }
        if (where === 'default') {

            if(screenWidth >= 1100 ){
                if (pars === 'width') {
                    let width = sizes.split('x')[0]
                    return +width === 26 ? +width * 20 : +width === 70 ? +width * 8 : +width * 10
                }
                if (pars === 'height') {
                    let height = sizes.split('x')[1]
                    return +height === 42 ? +height * 20 : +height === 100 ? +height * 8 : +height * 11
                }
            } else {
                if (pars === 'width') {
                    let width = sizes.split('x')[0]
                    return +width === 26 ? +width * 10 : +width === 70 ? +width * 5 : +width * 5
                }
                if (pars === 'height') {
                    let height = sizes.split('x')[1]
                    return +height === 42 ? +height * 10 : +height === 100 ? +height * 5 : +height * 6
                }
            }

        }

        if (where === 'modal') {
            if (pars === 'width') {
                let width = sizes.split('x')[0]
                return +width === 26 ? +width * 25 : +width === 70 ? +width * 10 : +width * 12
            }
            if (pars === 'height') {
                let height = sizes.split('x')[1]
                return +height === 42 ? +height * 25 : +height === 100 ? +height * 10 : +height * 14
            }
        }

    }

    return (
        <>
            {!close ? <img src={children.props.src}
                           width={setSizes(imageProps.sizes, 'width')}
                           height={setSizes(imageProps.sizes, 'height')}
                           onClick={openModal}
            /> : <div className={style.modal}>
                <div className={style.modal_content_wrapper}>
                    <img className={style.modal_image} src={children.props.src}
                         width={setSizes(imageProps.sizes, 'width', 'modal')}
                         height={setSizes(imageProps.sizes, 'height', 'modal')}
                         onClick={closeModal}/>
                    <span className={style.close} onClick={closeModal}/>
                </div>
            </div>}

        </>
    );
};

export default ModalImage;