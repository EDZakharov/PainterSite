import React from 'react';

const ImageName = () => {
    return (
        <form className="input">
            <div className="row">
                <div className="input-field">
                    <input id="image_name" type="text" className="validate"/>
                    <label htmlFor="image_name">Введите название изображения</label>
                </div>
            </div>
        </form>
    );
};

export default ImageName;