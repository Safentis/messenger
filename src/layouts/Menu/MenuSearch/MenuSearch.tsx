import { FC    } from 'react';
import { Props } from './MenuSearch.interface';
import './MenuSearch.css';

//* FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch        } from '@fortawesome/free-solid-svg-icons';

//* COMPONENTS
import Button from '../../../components/Button/Button';
import Input  from '../../../components/Input/Input';

const MenuSearch: FC <Props> = ({className = ''}): any => {
    return (
        <div className={"search " + className}>
            <div className="search__input-wrapper">
                <Button className="search__button">
                    <FontAwesomeIcon className="icon icon_white search__icon" icon={faSearch} />
                </Button>
                <Input className="input-search search__input" placeholder="Search Here..." />
            </div>
        </div>
    );
};

export default MenuSearch;