import React, {useState} from 'react';
import style from './Modal-contacts.module.scss'
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input/input"
import {useSetOrderMutation} from "../../../redux/api";

const ModalContacts = () => {
    const [close, setClose] = useState(false)
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const [value3, setValue3] = useState('')
    const [setData] = useSetOrderMutation()
    // const [visited, setVisited] = useState(false)

    const onOpen = () => {
        const isVisited = localStorage.getItem('isVisited')
        if (isVisited === "true") {
            alert('Вы уже отправили данные')
        } else {
            document.querySelector('body').style.overflow = 'hidden'
            setClose(!close)
        }
    }
    const onClose = () => {
        document.querySelector('body').style.overflow = 'auto'
        setValue1('')
        setValue2('')
        setValue3('')
        localStorage.setItem('isVisited', "false")
        setClose(!close)
    }

    return (
        <>
            {close ? <div className={style.modal_contacts}>
                <div className={style.modal_data}>
                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        localStorage.setItem('isVisited', "true")
                        document.querySelector('body').style.overflow = 'auto'
                        setData({
                            phone:value1,
                            email:value2,
                            comment:value3
                        })
                        setClose(!close)
                        console.log(e)
                        // handleSubmit(e.target.value)
                    }}>
                        <label>
                            Ваш номер телефона:
                            <PhoneInput
                                value={value1}
                                onChange={setValue1}
                                name="phoneInput"
                                rules={{ required: true }}
                                placeholder="+7 999 123 45 67"
                            />
                        </label>
                        <label>
                            Email:
                            <input type="email"
                                   value={value2}
                                   onChange={(e) => {setValue2(e.target.value)}}
                                   name="phone"
                                   required={true}
                                   placeholder="user@mail.ru"
                            />
                        </label>
                        <label>
                            Ваш вопрос:
                            <input type="text"
                                   value={value3}
                                   onChange={(e) => {setValue3(e.target.value)}}
                                   name="phone"
                                   placeholder="Название картины"
                                   required={true}
                            />
                        </label>
                        <button type="submit" className={style.submit_btn}>Отправить</button>
                    </form>
                    <span className={style.modal_close} onClick={onClose}/>
                </div>

            </div> : ""}
            <button onClick={onOpen}>Обратная связь</button>
        </>
    );
};

export default ModalContacts;