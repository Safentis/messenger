import { FC              } from 'react';
import { Props           } from './Stars.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar          } from '@fortawesome/free-solid-svg-icons';
import './Stars.css';

const Stars: FC <Props> = ({className = '', stars = []}): any => {
    return (
        <ul className={`stars ${className}`}>
            {stars.map((item: number) =>
                <li className="stars__item" key={item}>
                    <FontAwesomeIcon 
                        className="stars__icon" 
                        icon={faStar}
                    />
                </li>
            )}
        </ul>
    );
};

export default Stars;