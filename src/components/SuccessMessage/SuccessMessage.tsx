import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { Props } from './SuccessMessage.interface';
import './SuccessMessage.css';

const SuccessMessage: FC<Props> = ({
  children = 'Success',
  className = '',
}): React.ReactElement => {
  return (
    <div className={'success-message ' + className}>
      <p className="success-message__text success-message__text_green">
        <FontAwesomeIcon className="success-message__icon_green" icon={faCheck} />
        {children}
      </p>
    </div>
  );
};

export default SuccessMessage;
