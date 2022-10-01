import React, {useState} from 'react';
import style from './Gallery.module.scss'
import logo1 from '../../assets/1.jpg'
import logo2 from '../../assets/2.jpg'
import logo3 from '../../assets/3.jpg'
import logo4 from '../../assets/4.jpg'
import logo5 from '../../assets/5.jpg'
import logo6 from '../../assets/6.jpg'
import GalleryVelvet from "../GalleryVelvet/GalleryVelvet";


const Gallery = () => {


    const [fileData, setFileData] = useState("");
    // const [fileData2, setFileData2] = useState("");

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0]);
    };
    // const fileChangeHandler2 = (e) => {
    //     setFileData2(e.target.value);
    // };

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (
            (fileData && fileData.type === "image/png") ||
            fileData.type === "image/jpeg" ||
            fileData.type === "image/jpg"
        ) {

            const data = new FormData();
            data.append("image", fileData);
            fetch(
                `http://localhost:7789/api/upload`,
                {
                    method: "POST",
                    body: data,
                    // headers:{
                    //     Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpdml6aWEyMTVAYmsucnUiLCJ1c2VySWQiOiI2MzMwNTJkYTExOWJlMjg2MDRmNzE1NzUiLCJpYXQiOjE2NjQxMTQ5NjUsImV4cCI6MTY2NDExODU2NX0.xUeV3ocIeKg8kyi7LyDEZfVylPjgsxphggD4gtbG0ho"
                    // }
                }
            )
                .then((result) => {
                    console.log("File Sent Successful");
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };


    let [link1State, setLink1State] = useState(true);
    let [link2State, setLink2State] = useState(false);
    let [link3State, setLink3State] = useState(false);
    let [linkPos, setLinkPos] = useState(1)

    const onchangeState1 = () => {
        setLink1State(true)
        setLink2State(false)
        setLink3State(false)
        setLinkPos(1)
    }
    const onchangeState2 = () => {
        setLink1State(false)
        setLink2State(true)
        setLink3State(false)
        setLinkPos(2)
    }
    const onchangeState3 = () => {
        setLink1State(false)
        setLink2State(false)
        setLink3State(true)
        setLinkPos(3)
    }

    let menuList = [
        {
            id: 1, onClick: onchangeState1,
            className: link1State ? style.active : '',
            text: 'Картины на бархатной бумаге'
        },
        {
            id: 2, onClick: onchangeState2,
            className: link2State ? style.active : '',
            text: 'Картины на бумаге'
        },
        {
            id: 3, onClick: onchangeState3,
            className: link3State ? style.active : '',
            text: 'Картины на шёлке'
        }
    ]

    let imagesMass = [
        {
            id: 1,
            src: logo1,
            type: 'Масло',
            sizes: '70 х 100 см',
            material: 'Бархатная бумага',
            name: 'Небытие, 2021',
            description: 'Описание',
            width: '339px',
            height: '469px',
        },
        {
            id: 2,
            src: logo2,
            type: 'Масло',
            sizes: '70 х 100 см',
            material: 'Бархатная бумага',
            name: 'Дары смерти, 2021',
            description: 'Описание',
            width: '339px',
            height: '469px',
        },
        {
            id: 3,
            src: logo3,
            type: 'Масло',
            sizes: '70 х 100 см',
            material: 'Бархатная бумага',
            name: 'Сквозь игольное ушко, 2021',
            description: 'Описание',
            width: '339px',
            height: '469px',
        },
        {
            id: 4,
            src: logo4,
            type: 'Масло',
            sizes: '50 х 70 см',
            material: 'Бархатная бумага',
            name: 'Спор двух ангелов, 2021',
            description: 'Описание',
            width: '339px',
            height: '400px',
        },
        {
            id: 5,
            src: logo5,
            type: 'Масло',
            sizes: '70 х 100 см',
            material: 'Бархатная бумага',
            name: 'До конца претерпевший, 2021',
            description: 'Описание',
            width: '339px',
            height: '469px',
        },
        {
            id: 6,
            src: logo6,
            type: 'Масло',
            sizes: '70 х 100 см',
            material: 'Бархатная бумага',
            name: 'Приветствие людям, 2021',
            description: 'Описание',
            width: '339px',
            height: '469px',
        },
    ]


    return (
        <div className={style.gallery}>
            <div className={style.wrapper}>
                <div className={style.typeList}>
                    <div className={style.selection}>
                        {menuList.map(el => <span key={el.id} onClick={el.onClick}
                                                  className={el.className}>{el.text}</span>)}
                    </div>
                    {linkPos === 1 ? imagesMass.map(el => <GalleryVelvet key={el.id}
                                                                         image={el.src}
                                                                         name={el.name}
                                                                         sizes={el.sizes}
                                                                         type={el.type}
                                                                         material={el.material}
                                                                         description={el.description}
                                                                         width={el.width}
                                                                         height={el.height}/>)
                        : ''}
                    {linkPos === 2 ? <div className={style.two}>В разработке...</div> : ''}
                    {linkPos === 3 ? <div className={style.three}>В разработке...</div> : ''}
                    <div className="container">
                        <h1>File Upload</h1>
                        <form onSubmit={onSubmitHandler} name="image">
                            <input type="file" onChange={fileChangeHandler}/>
                            {/*<input type="text" onChange={fileChangeHandler2}/>*/}
                            <button type="submit" className="profile-order-button">
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;