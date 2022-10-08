import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {setCurrentPath} from "../../../redux/toolkit";
import {useDispatch} from "react-redux";
import Card from "./Card/Card";
import CardAdd from "./Card-add/Card-add";
import {useGetImagesQuery, useSetImageMutation} from "../../../redux/api";

const CardWrapper = ({image}) => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch()

    const spanEditClickHandler = (e) => {
        dispatch(setCurrentPath({
            id: image._id,
            name: image.name,
            path: `/admin/image?id=${image._id}&edit=true`
        }))
        navigateTo(`/admin/image?id=${image._id}&edit=true`)
    }

    const imageSplitName = image.name.split('-')

    return (
        <Card name={image.name}
              description={image.description}
              imageSplitName={imageSplitName}
              spanEditClickHandler={spanEditClickHandler}/>
    )
}


const Cards = () => {
    const {data = [], isSuccess} = useGetImagesQuery()
    const [fileData, setFileData] = useState(null)
    const [description, setDescription] = useState('')
    const [setImage] = useSetImageMutation()
    const buttonHandler = useRef()
    const buttonHandler2 = useRef()
    const textHandler = useRef()
    const onSubmitHandler = (e) => {
        e.preventDefault()
        if(fileData !== null) {
            const dto = {
                file:fileData,
                description
            }
            setImage(dto)
        }
        buttonHandler.current.value = null;
        buttonHandler2.current.value = "Выберите файл..."
        textHandler.current.value = ''
        setFileData(null)
    };

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0]);
        buttonHandler2.current.value = e.target.files[0].name
    }

    const textChangeHandler = (e) => {
        setDescription(e.target.value)
    }

    return (
        <div>
            <CardAdd onSubmitHandler={onSubmitHandler}
                     fileChangeHandler={fileChangeHandler}
                     textChangeHandler={textChangeHandler}
                     buttonHandler={buttonHandler}
                     buttonHandler2={buttonHandler2}
                     textHandler={textHandler}/>
            <div className='card-wrapper'>
                <div className='card-wrapper-center'>
                    {isSuccess && data.map(el => (<CardWrapper key={el._id} image={el}/>))}
                </div>
            </div>
        </div>

    );
};

export default Cards;