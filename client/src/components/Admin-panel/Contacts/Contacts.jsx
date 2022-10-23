import React, {useState} from 'react';
import {useGetContactsQuery, usePatchContactsMutation} from "../../../redux/api";
import Preloader from "../../all/Preloader";
import style from './Contacts.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setContacts} from "../../../redux/toolkit";


const Contacts = () => {
    const {data, isLoading} = useGetContactsQuery()
    const [uploadNewContacts] = usePatchContactsMutation()
    const [value, setValue] = useState('')
    const [value1, setValue1] = useState('')
    const [value2, setValue2] = useState('')
    const selector = useSelector(state => state.adminPanel.contacts)
    const dispatch = useDispatch()

    return (
        <div className={style.contacts}>{isLoading ? <Preloader/> :
            <div className={style.form}>
                <form>
                    <div>
                        <h5>Телефон: {selector.phone ?
                            selector.phone : data ?
                                data[0].contacts.phone : ''}</h5>
                        <input value={value}
                               placeholder="Изменить номер телефона без + (пример: 79516870124)"
                               onChange={(e) => {
                                   setValue(e.target.value)
                               }}
                               required={true}
                        />
                    </div>
                    <div>
                        <h5>Telegram: {selector.telegram ?
                            selector.telegram : data ?
                                data[0].contacts.telegram : ''}</h5>
                        <input value={value1}
                               placeholder="Вставьте ссылку на Telegram профиль"
                               onChange={(e) => {
                                   setValue1(e.target.value)
                               }}
                               required={true}
                        />
                    </div>
                    <div>
                        <h5>WhatsApp: {selector.telegram ?
                            selector.telegram : data ?
                                data[0].contacts.whatsApp : ''}</h5>
                        <input value={value2}
                               placeholder="Вставьте ссылку на WhatsApp профиль"
                               onChange={(e) => {
                                   setValue2(e.target.value)
                               }}
                               required={true}
                        />
                    </div>
                    <div className={style.btn}>
                        <button onClick={(e) => {
                            e.preventDefault()
                            const newData = {
                                phone: value,
                                telegram: value1,
                                whatsApp: value2
                            }
                            if(!value || !value1 || !value2){
                                const conf = window.confirm(`Заполните все поля!`)
                                return conf
                            } else {
                                dispatch(setContacts(newData))
                                uploadNewContacts(newData)
                                setValue('')
                                setValue1('')
                                setValue2('')
                            }
                        }}>Подтвердить изменения
                        </button>
                    </div>
                </form>


            </div>
        }
        </div>
    );
};

export default Contacts;