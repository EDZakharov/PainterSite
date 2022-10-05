import React, {useState} from 'react';
import {useGetImagesQuery} from "../../../redux/redux-query";
import PATH from "../../../SERV_PATH";




const CardImage = ({image}) => {


    const spanEditClickHandler = (e) => {
        console.log(e)
    }

    const spanDelClickHandler = (e) => {
        const data = alert('Подтвердить удаление?')
        console.log(data)
    }

    const imageName = image.name.split('-')

    return (
        <div className="card">
            <div className="card-image">
                <img src={`${PATH}images/`+ image.name} height={'269px'}/>
                <span className="card-title"><span className="text">{imageName[2]}</span></span>
            </div>
            <div className="card-content">
                <p>{image.imageSrc}</p>
            </div>
            <div className="card-action">
                <span onClick={spanEditClickHandler}>Редактировать</span>
                <span onClick={spanDelClickHandler}>Удалить</span>
            </div>
        </div>
    )
}


const Card = () => {
    const {data = [], isLoading, isSuccess, isError} = useGetImagesQuery()
    const [status, setStatus] = useState(null)
    return (
        <div><button onClick={(e) => {
            e.preventDefault()
            isSuccess && setStatus(!status)
        }}>Показать список картинок</button>
            <div className='card-wrapper'>
                <div className='card-wrapper-center'>
                    {status && data.map(el => (<CardImage key={el._id} image={el}/>))}
                </div>
            </div>
        </div>

    );
};

export default Card;