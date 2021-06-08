import React                   from 'react';
import Props                   from './ErrorMessage.interface';
import { FontAwesomeIcon     } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import './ErrorMessage.css';

const ErrorMessage = ({error, touched}: Props): any => {
    return (
        touched && error
            ?   <div className="error-message">
                    <p className="error-message__text">
                        <FontAwesomeIcon 
                            className="error-message__icon" 
                            icon={faExclamationCircle}
                        /> 
                        {error}
                    </p>
                </div>
            : null
    );
};

export default ErrorMessage;