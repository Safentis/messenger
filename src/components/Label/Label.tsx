import React from 'react';
import Props from './Label.interface';
import './Label.css';

const Label = ({children, className = '', attrs}: Props) => {
    return (
        <label className={`${className} label`} {...attrs}>
            {[...children]}
        </label>
    );
};

export default Label;