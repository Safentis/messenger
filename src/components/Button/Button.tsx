import React from 'react';
import Props from './Button.interface';
import './Button.css';

const Button = ({children = 'button', className = '', ...attrs}: Props | any) => {
    return (
        <button className={`button ${className}`} {...attrs}>
            {children}
        </button>
    );
};

export default Button;