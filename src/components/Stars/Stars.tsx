import { FC              } from 'react';
import { Props           } from './Stars.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar          } from '@fortawesome/free-solid-svg-icons';
import './Stars.css';

const Stars: FC <Props> = ({className = '', score = undefined}): any => {
    return (
        score
            ? <ul className={`stars ${className}`}>
                {[...Array(score).keys()].map((item: number, index: number) =>
                    <li className="stars__item" key={index}>
                        <FontAwesomeIcon 
                            className="stars__icon" 
                            icon={faStar}
                        />
                    </li>
                )}
              </ul>
            : null
    );
};

export default Stars;