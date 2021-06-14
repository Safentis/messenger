import { FC    } from 'react';
import { Props } from './SuccessMessage.interface';
import './SuccessMessage.css';

//FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck         } from '@fortawesome/free-solid-svg-icons';

const SuccessMessage: FC <Props> = ({children = 'Success', className = ''}): any => {
    return (
        <div className={"success-message " + className}>
            <p className="success-message__text success-message__text_green">
                <FontAwesomeIcon className="success-message__icon_green" icon={faCheck}/>
                {children}
            </p>
        </div>
    );
};

export default SuccessMessage;