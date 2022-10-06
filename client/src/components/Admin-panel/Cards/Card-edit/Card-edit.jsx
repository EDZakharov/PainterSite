import React, {useEffect, useState} from 'react';
import style from './Card-edit.module.scss'
import PATH from "../../../../SERV_PATH";
import {useNavigate} from "react-router";
import {useChangeImageDescriptionMutation, useDelImageMutation} from "../../../../redux/redux-query";


const CardEdit = () => {
    const navigateTo = useNavigate();
    const imageLocalPath = localStorage.currentEditImagePath ? JSON.parse(localStorage.currentEditImagePath) : ''
    const [delImage, isSuccess] = useDelImageMutation()
    const [data] = useChangeImageDescriptionMutation()
    const [open, setOpen] = useState(false)
    const [text, setText] = useState(null)

    useEffect(()=>{
        if (!imageLocalPath) {
            return navigateTo(`/admin`)
        }
    },[])

    // console.log(`${PATH}images/` + imageLocalPath.name)

    const onButtonDel = () => {
        delImage(imageLocalPath.name)
        isSuccess && navigateTo(`/admin`)
    }

    const onSubmitHandler = () => {
        data({name:imageLocalPath.name, description: text})
        isSuccess && navigateTo(`/admin`)
    }

    const textChangeHandler = (e) => {
        setText(e.target.value)
    }



    return (
        <div className={style.edit}>
            <img alt="image" src={`${PATH}images/` + imageLocalPath.name} height={'369px'}/>
            <div className={style.buttons}>
                <div className={style.edit_btn_del}>
                    <button className="btn waves-effect waves-light"
                            type="submit"
                            name="action"
                            onClick={onButtonDel}>
                        <i className="material-icons">Удалить</i>
                    </button>
                </div>
                <div className={style.edit_btn_edit}>
                    <button className="btn waves-effect waves-light"
                            type="submit"
                            name="action"
                            onClick={(e) => {
                                e.preventDefault()
                                setOpen(!open)
                            }}>
                        <i className="material-icons">Редактировать</i>
                    </button>
                </div>
                <div className={style.edit_btn_back}>
                    <button className="btn waves-effect waves-light"
                            type="submit"
                            name="action"
                            onClick={() => navigateTo(`/admin`)}>
                        <i className="material-icons">Назад</i>
                    </button>
                </div>
            </div>
            <div className={style.edit_form}>
                {open && <div>
                    <form onSubmit={onSubmitHandler} name="image">
                        <div className="input-field">
                            <input id="text" type="text" onChange={textChangeHandler} className="validate"/>
                            <label htmlFor="text">Введите описание</label>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action"><i className="material-icons">Отправить</i></button>
                        {/*<button type="submit" className="profile-order-button" >*/}
                        {/*    */}
                        {/*</button>*/}
                    </form>
                </div>}
            </div>
        </div>
    );
};

export default CardEdit;