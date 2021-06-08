import React from 'react';
import Props from './ErrorMessage.interface';
import './ErrorMessage.css';

const ErrorMessage = ({error, touched}: Props): any => {
    return (
        touched && error
            ?   <div className="error-message">
                    <p className="error-message__text">
                        {error}
                    </p>
                </div>
            : null
    );
};

export default ErrorMessage;