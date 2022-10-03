import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import style from './Expositions.module.scss'
import {incremented, decremented, addTodo, delLastTodo} from "../../redux/toolkit";


const Expositions = () => {
    const count = useSelector(state => state.value)
    const todos = useSelector(state => state.todo)
    const dispatch = useDispatch()

    const [value,setValue] = useState('')


    useEffect(()=>{
        console.log(todos)
    },[todos])

    return (
    <div className={style.counter}>
        <div>
            <span>{count}</span>
            <button onClick={() => dispatch(decremented())}>decrement</button>
            <button onClick={() => dispatch(incremented())}>increment</button>
            <button onClick={() => {
                if(value.length !== 0) {
                    dispatch(addTodo({id: Date.now(), name: value}))
                    setValue('')}
            }}>AddTodo</button>
            <button onClick={() => {
                if(todos.length !== 0){
                    dispatch(delLastTodo())}
            }}>delLast</button>
            <input onChange={(e) => {setValue(e.target.value)}} value={value}/>
            {todos.map(el => (<div key={el.id}>{el.name}</div>))}
        </div>

    </div>
)};

export default Expositions;