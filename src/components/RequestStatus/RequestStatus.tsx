import React from 'react';
import Props from './RequestStatus.interface';
import './RequestStatus.css';

const RequestStatus = ({status}: Props): any => {
    return (
        <div className="status">
            {
                status != undefined  
                    ? status 
                        ? <p className="status-ok">Successful request</p> 
                        : <p className="status-bad">Bad request</p>
                    : ''
            }
        </div>
    )
}

export default RequestStatus;