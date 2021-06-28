import { FC             } from 'react';
import { Props          } from './Search.interface';
import './Search.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch        } from '@fortawesome/free-solid-svg-icons';
import Button              from '../Button/Button';
import Input               from '../Input/Input';
import input               from '../../HOC/input';

const Search:FC <Props> = ({value, handleChange}): any => {
    return (
        <>
            <div className="search">
                <FontAwesomeIcon 
                    className="icon search__icon" 
                    icon={faSearch}
                />
                <Input 
                    className="search__input" 
                    value={value} 
                    type="text" 
                    placeholder="Search Here"
                    onChange={handleChange}
                />
            </div>
        </>
    );
};

export default input(Search);