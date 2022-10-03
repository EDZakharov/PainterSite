import React, {useEffect, useState} from 'react';
import style from './Gallery.module.scss'
import GalleryVelvet from "../GalleryVelvet/GalleryVelvet";


const Gallery = () => {

    const url = `http://localhost:7789/api/images/`
    const [fileData, setFileData] = useState("")
    const [images, setImages] = useState([])

    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0]);
    }

    useEffect(() => {
        (async function getItemsList() {
            await fetch('http://localhost:7789/api/images').then(data => {
                return data.json()
            }).then(data => {
                setImages(data)
            })
        })()
    }, [])


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


    let [link1State, setLink1State] = useState(true)
    let [link2State, setLink2State] = useState(false)
    let [link3State, setLink3State] = useState(false)


    const onchangeState1 = () => {
        setLink1State(true)
        setLink2State(false)
        setLink3State(false)
    }
    const onchangeState2 = () => {
        setLink1State(false)
        setLink2State(true)
        setLink3State(false)
    }
    const onchangeState3 = () => {
        setLink1State(false)
        setLink2State(false)
        setLink3State(true)
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


    return (
        <div className={style.gallery}>
            <div className={style.wrapper}>
                <div className={style.typeList}>
                    <div className={style.selection}>
                        {menuList.map(el => <span key={el.id} onClick={el.onClick}
                                                  className={el.className}>{el.text}</span>)}
                    </div>
                    {link1State && images.map(el => {
                        return <GalleryVelvet key={el._id} image={url + el.name} width={'339px'} height={'469px'}/>
                    })}
                    {}
                    {link2State && <div className={style.two}>В разработке...</div>}
                    {link3State && <div className={style.three}>В разработке...</div>}
                    <div className="container">
                        <h1>File Upload</h1>
                        <form onSubmit={onSubmitHandler} name="image">
                            <input type="file" onChange={fileChangeHandler}/>
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