import React, {useEffect} from 'react';
import {useGetBioQuery} from "../../../redux/api";
import Preloader from "../../all/Preloader";
import {useSelector} from "react-redux";
import style from './Bio.module.scss'
import TextEditor from "./Text-editor/Text-editor";

const Bio = () => {
    const {data, isLoading} = useGetBioQuery()
    const biography = useSelector(state => state.adminPanel.biography)
    useEffect(() => {
    }, [biography])

    if (isLoading) return <Preloader/>
    return (
        <div className={style.biography}>
            <div className={style.biography_edit}>
                <form name="biography">
                    <TextEditor defValue={data} biography={biography}/>
                </form>
            </div>
        </div>
    )
}

export default Bio