import React from 'react';
import Props from './Label.interface';
import './Label.css';

const Label = ({children, className = '', attrs}: Props) => {
    return (
        <label className={`${className} label`} {...attrs}>
            {[children].length <= 1 ? children : [...children]}
        </label>
    );
};

export default Label;