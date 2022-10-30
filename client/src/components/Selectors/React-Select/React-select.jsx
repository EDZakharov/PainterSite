import React from 'react';
import Select from 'react-select';
import style from './React-select.module.scss'

const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
    },
});

const colourStyles = {
    control: (styles) => ({...styles, backgroundColor: 'white', cursor: 'pointer'}),
    option: (styles, {isDisabled, isFocused, isSelected}) => {
        return {
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                    ? 'gray'
                    : isFocused
                        ? 'white'
                        : undefined,
            color: isDisabled
                ? '#ccc'
                : isSelected
                    ? 'white'
                    : 'black',
            cursor: isDisabled ? 'not-allowed' : 'pointer',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? '#5f5f5f'
                        : '#b6b6b6'
                    : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? 'white'
                        : '#343434',
            },
        };
    },

    input: (styles) => ({...styles, ...dot()}),
    placeholder: (styles) => ({...styles, ...dot('black'),}),
    singleValue: (styles) => ({...styles, ...dot("black")}),
};
const React_Select = ({
                          onCategoriesSelectHandler,
                          categoriesHandler,
                          sizesHandler,
                          onSizesSelectHandler
}) => {

    const onSelectChange1 = (e) => {
        return onCategoriesSelectHandler(e)
    }

    const onSelectChange2 = (e) => {
        return onSizesSelectHandler(e)
    }

    return (
        <div className={style.selectors}>
            <Select styles={colourStyles}
                    ref={categoriesHandler}
                    onChange={onSelectChange1}
                    className={style.select}
                    placeholder={'Выберите категорию'}
                    options={[
                        {value: "Paper", label: "На бумаге тушью"},
                        {value: "Else", label: "Другое"},
                        {value: "Canvas", label: "На холсте маслом"},
                    ]}/>
            <Select styles={colourStyles}
                    ref={sizesHandler}
                    onChange={onSelectChange2}
                    className={style.select}
                    placeholder={'Выберите размер'}
                    options={[
                        {value: "70x100", label: "70x100"},
                        {value: "50x70", label: "50x70"},
                        {value: "26x42", label: "26x42"}
                    ]}/>
        </div>
    )
}
export default React_Select