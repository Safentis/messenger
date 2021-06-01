import React from 'react';
import './InputError.css';

type Props = {
    message: string
}

const InputError = ({message}: Props) => {
    return (
        <p className="input-error">
            {message}
        </p>
    );
};

export default InputError;