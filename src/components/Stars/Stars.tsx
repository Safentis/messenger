import { FC              } from 'react';
import { Props           } from './Stars.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar          } from '@fortawesome/free-solid-svg-icons';
import './Stars.css';

const Stars: FC <Props> = ({className = '', score = undefined}): any => {
    
    const stars: number[] = [];

    if (score) {

        for (let i = 0; i < score; i++) {
            stars.push(i);
        }
    }

    return (
        stars.length > 0
            ? <ul className={`stars ${className}`}>
                {stars.map((item: number, index: number) =>
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