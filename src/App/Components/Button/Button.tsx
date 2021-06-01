import React from 'react';
import './Button.css';

const Button = ({children, className = '', ...attrs}: any) => {
    return (
        <button className={`${className} button`} {...attrs}>
            {children}
        </button>
    );
};

export default Button;