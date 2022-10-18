import React, {useState} from 'react';
import style from './Menu-selectors.module.scss'

const MenuSelectors = ({menuPosChecker}) => {

    let [link1State, setLink1State] = useState(true)
    let [link2State, setLink2State] = useState(false)
    let [link3State, setLink3State] = useState(false)


    const onchangeState1 = () => {
        setLink1State(true)
        setLink2State(false)
        setLink3State(false)
        checkStatus(1)
    }
    const onchangeState2 = () => {
        setLink1State(false)
        setLink2State(true)
        setLink3State(false)
        checkStatus(2)
    }
    const onchangeState3 = () => {
        setLink1State(false)
        setLink2State(false)
        setLink3State(true)
        checkStatus(3)
    }

    const checkStatus = (position) => {
        return menuPosChecker ? menuPosChecker(position):""
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
                </div>
            </div>
        </div>
    );
};

export default MenuSelectors;