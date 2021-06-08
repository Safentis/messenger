import React               from 'react';
import Props               from './RequestStatus.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './RequestStatus.css';

const RequestStatus = ({className = '', children = '', status}: Props): any => {
    const classStatusDiv : string = status ? 'status_blue' : 'status_brown',
          classStatusP   : string = status ? 'status__text_green' : 'status__text_red',
          classStatusIcon: string = status ? 'status__icon_green' : 'status__icon_brown',
          iconType       : any    = status ? faCheckCircle : faExclamationCircle;

    return (
        <div className={`status ${classStatusDiv} ${className}`}>
            <p className={`status__text ${classStatusP}`}>
                <FontAwesomeIcon 
                    className={`status__icon ${classStatusIcon}`} 
                    icon={iconType} 
                    size="lg" 
                />
                {children}
            </p>
        </div> 
    );
};

export default RequestStatus;