import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { Props } from './StatusOnline.interface';
import './StatusOnline.css';

const StatusOnline: FC<Props> = ({ className = '' }): React.ReactElement => {
  return (
    <>
      <FontAwesomeIcon className={'status-online ' + className} icon={faCircle} />
    </>
  );
};

export default StatusOnline;
