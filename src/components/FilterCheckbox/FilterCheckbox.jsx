import React from 'react';

import "./FilterCheckbox.css"

const FilterCheckbox = ({isShortMovies, handleTumblerChange}) => {
    return (
        <>
            <label className="search-form__checkbox checkbox" onChange={handleTumblerChange}>
                <input type="checkbox" className="checkbox__system-checkbox" name="areShortiesSeleted"/>
                <span className={isShortMovies ? `checkbox__custom-checkbox checkbox__custom-checkbox--on`
                    : `checkbox__custom-checkbox checkbox__custom-checkbox--off`}></span>
                <span className="checkbox__label">Короткометражки</span>
            </label>
        </>
    );
};

export default FilterCheckbox;