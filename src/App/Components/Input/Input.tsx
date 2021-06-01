import React from 'react';
import './Input.css';

const Input = ({className, ...attrs}: any) => {
    return (
        <input className={`${className} input`} {...attrs} />
    );
};

export default Input;