import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {setCurrentPath} from "../../../redux/toolkit";
import {useDispatch} from "react-redux";
import Card from "./Card/Card";
import CardAdd from "./Card-add/Card-add";
import {useGetImagesQuery, useSetImageMutation} from "../../../redux/api";
import style from './Cards.module.scss'
import Preloader from "../../all/Preloader";

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

    console.log(image)
    return (
        <Card name={image.name}
              category={image.category}
              imageName={image.imageName}
              sizes={image.sizes}
              description={image.description}
              spanEditClickHandler={spanEditClickHandler}/>
    )
}


const Cards = () => {
    const {data = [], isSuccess, isLoading} = useGetImagesQuery()
    const [setImage] = useSetImageMutation()
    const [fileData, setFileData] = useState(null)

    const [description, setDescription] = useState('')
    const [name, setName] = useState('')
    const [categories, setCategories] = useState('')
    const [sizes, setSizes] = useState('')

    const inpFileHandler = useRef()
    const inpFileHandler2 = useRef()


    const categoriesHandler = useRef()
    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (fileData !== null) {
            const dto = {
                file: fileData,
                name: name,
                description: description,
                categories: categories,
                sizes: sizes,
            }
            // console.log(dto)
            setImage(dto)
        }
        inpFileHandler.current.value = null;
        inpFileHandler2.current.value = "Выберите файл..."
        setFileData(null)
        setCategories(null)
        setName('')
        setDescription('')
        categoriesHandler.current.selectOption("")
        setSizes('')
    };

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0]);
        inpFileHandler2.current.value = e.target.files[0].name
    }

    const onCategoriesSelectHandler = (e) => {
        setCategories(e.value)
    }

    return (
        <div className={style.cards}>
            <CardAdd onSubmitHandler={onSubmitHandler}
                     fileChangeHandler={fileChangeHandler}
                     onCategoriesSelectHandler={onCategoriesSelectHandler}
                     categoriesHandler={categoriesHandler}
                     inpFileHandler={inpFileHandler}
                     inpFileHandler2={inpFileHandler2}
                     description={description}
                     setDescription={setDescription}
                     name={name}
                     setName={setName}
                     sizes={sizes}
                     setSizes={setSizes}
                     />
            {isLoading? <Preloader/> : <div className={style.cardsWrapper}>
                {isSuccess && data.map(el => (<CardWrapper key={el._id} image={el}/>))}
            </div>}

        </div>

    );
};

export default Cards;