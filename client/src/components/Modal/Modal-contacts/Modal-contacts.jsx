import React, {useState} from 'react';
import style from './Modal-contacts.module.scss'

const ModalContacts = () => {
    const [close, setClose] = useState(false)

    const onOpen = () => {
        document.querySelector('body').style.overflow = 'hidden'
        setClose(!close)
    }
    const onClose = () => {
        document.querySelector('body').style.overflow = 'auto'
        setClose(!close)
    }


    return (
        <>
            {close ? <div className={style.modal_contacts}>
                <div className={style.modal_data}>
                    <form>
                        <input type="text" required={true}/>
                        <input type="text" required={true}/>
                        <input type="text" required={true}/>
                    </form>
                    <span className={style.modal_close} onClick={onClose}/>
                </div>

            </div> : ""}
            <button onClick={onOpen}>Обратная связь</button>
        </>
    );
};

export default ModalContacts;