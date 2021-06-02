import React from 'react';
import Props from './Label.interface';
import './Label.css';

const Label = ({children, className = ''}: Props) => {
    return (
        <label className={`${className} label`}>
            {[...children]}
        </label>
    );
};

export default Label;