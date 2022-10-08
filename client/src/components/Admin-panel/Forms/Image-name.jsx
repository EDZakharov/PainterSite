import React from 'react';

const ImageName = ({textChangeHandler, textHandler}) => {
    return (
        <div className="input-field" >
            <input id="image_name" type="text" className="validate"
                   onChange={textChangeHandler}
                   ref={textHandler}/>
            <label htmlFor="image_name">Введите название изображения</label>
        </div>
    );
};

export default ImageName;