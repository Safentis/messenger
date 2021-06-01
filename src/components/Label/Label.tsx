import React from 'react';
import './Label.css';

type Props = {
    children ?: any
    className?: string
    text     ?: string
}

const Label = ({children, className = '', text = ''}: Props) => {
    return (
        <label className={`${className} label`}>
            {text}
            {children}
        </label>
    );
};

export default Label;