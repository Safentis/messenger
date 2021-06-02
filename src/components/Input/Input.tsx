import React from 'react';
import Props from './Input.interface';
import './Input.css';

const Input = ({className, ...attrs}: Props | any) => {
    return (
        <input className={`${className} input`} {...attrs} />
    );
};

export default Input;