import React from 'react';
import Props from './RequestStatus.interface';
import './RequestStatus.css';

const RequestStatus = ({className = '', children = '', status}: Props): any => {
    return (
        <div className={`status ${status ? 'status_blue' : 'status_brown'} ${className}`}>
            <p className={`status__text ${status ? 'status__text_green' : 'status__text_red'}`}>
                {children}
            </p>
        </div> 
    );
};

export default RequestStatus;