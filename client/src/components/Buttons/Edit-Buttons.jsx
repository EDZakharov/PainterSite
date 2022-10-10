import React from 'react';

const EditButtons = ({className, onclick, tittle}) => {
    return (
        <div className={className}>
            <button className="btn waves-effect waves-light"
                    type="submit"
                    name="action"
                    onClick={onclick}>
                <i className="material-icons">{tittle}</i>
            </button>
        </div>
    );
};

export default EditButtons;