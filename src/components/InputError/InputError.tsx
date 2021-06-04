import React from 'react';
import Props from './InputError.interface';
import './InputError.css';

const InputError = ({error, touched}: Props): any => {
    return (
        touched && error
            ?
                <p className="input-error">
                    {error}
                </p>
            : null
    );
};

export default InputError;