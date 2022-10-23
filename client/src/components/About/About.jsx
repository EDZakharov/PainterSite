import React, {useEffect, useRef} from 'react';
import style from './About.module.scss'
import {useGetBioQuery} from "../../redux/api";
import Preloader from "../all/Preloader";

const About = () => {
    const {data, isLoading} = useGetBioQuery()
    const dataToHtml = useRef()
    useEffect(() => {
        if(data) {
            dataToHtml.current.innerHTML = data.biography
        }
    }, [data])

    return (
        <div className={style.aboutWrapper}>
            {isLoading ? <Preloader/> :
                data? <div className={style.about} ref={dataToHtml}/> : <Preloader/>}
        </div>
    );
};

export default About;