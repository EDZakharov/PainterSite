import React, {useEffect, useState} from 'react';
import style from './Card-edit.module.scss'
import PATH from "../../../../SERV_PATH";
import {useNavigate} from "react-router-dom";
import {useChangeImageDescriptionMutation, useDelImageMutation} from "../../../../redux/api";
import EditButtons from "../../../Buttons/Edit-Buttons";


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
    },[imageLocalPath,navigateTo])

    const onButtonDel = () => {
        delImage(imageLocalPath.name)
        isSuccess && navigateTo(`/admin`)
    }

    const onButtonEdit = (e) => {
        e.preventDefault()
        setOpen(!open)
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
            <img alt={imageLocalPath.name} src={`${PATH}images/` + imageLocalPath.name} height={'369px'}/>
            <div className={style.buttons}>
                <EditButtons className={style.edit_btn_del}
                             onclick={onButtonDel}
                             tittle={"Удалить"}/>
                <EditButtons className={style.edit_btn_edit}
                             onclick={onButtonEdit}
                             tittle={"Редактировать"}/>
                <EditButtons className={style.edit_btn_back}
                             onclick={() => navigateTo(`/admin`)}
                             tittle={"Назад"}/>
            </div>
            <div className={style.edit_form}>
                {open && <div>
                    <form onSubmit={onSubmitHandler} name="image">
                        <div className="input-field">
                            <input id="text" type="text" onChange={textChangeHandler} className="validate"/>
                            <label htmlFor="text">Введите описание</label>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action"><i className="material-icons">Отправить</i></button>
                    </form>
                </div>}
            </div>
        </div>
    );
};

export default CardEdit;