import React from 'react';
import './MenuSearch.css';

//* FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch        } from '@fortawesome/free-solid-svg-icons';

//* COMPONENTS
import Button from '../../../components/Button/Button';
import Input  from '../../../components/Input/Input';

const MenuSearch = (): any => {
    return (
        <div className="search">
            <div className="search__input-wrapper">
                <Button className="search__button">
                    <FontAwesomeIcon 
                        className="menu__icon search__icon icon" 
                        icon={faSearch}
                    />
                </Button>
                <Input className="input-search search__input"/>
            </div>
        </div>
    );
};

export default MenuSearch;