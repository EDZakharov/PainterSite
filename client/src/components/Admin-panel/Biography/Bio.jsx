import React, {useEffect, useRef, useState} from 'react';
import {useGetBioQuery, usePatchBioMutation} from "../../../redux/api";
import Preloader from "../../all/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {setBiography} from "../../../redux/toolkit";
import style from './Bio.module.scss'
import styled from 'styled-components';
import TextEditor from "./Text-editor/Text-editor";

const Bio = () => {
    const [value, setValue] = useState('')

    const {data, isLoading} = useGetBioQuery()
    const [body] = usePatchBioMutation()
    const dispatch = useDispatch()
    const biography = useSelector(state => state.adminPanel.biography)

    useEffect(() => {
    }, [biography])

    const onBtnClick = (e) => {
        e.preventDefault()
        setValue('')
        body({description: value})
        dispatch(setBiography(value))
    }

    const onInpChange = (e) => {
        setValue(e.target.value)
    }


    if (isLoading) return <Preloader/>
    return (
//
        <div className={style.biography}>
            <div className={style.biography_current}>
                <h3>Текущая биография:</h3>
                <article>
                    <p>{biography ? biography : data.biography}</p>
                </article>
            </div>
            <div className={style.biography_edit}>

                <div className={style.biography_edit_form}>
                    <form name="biography">
                        <TextEditor setValue={setValue} value={value} defValue={data} biography={biography}/>
                    </form>
                    <button type="submit" onClick={onBtnClick} className={style.biography_edit_button}>Отправить
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Bio;