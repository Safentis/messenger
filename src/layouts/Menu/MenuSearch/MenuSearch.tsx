import { FC, ChangeEvent, useState } from 'react';
import { Props           } from './MenuSearch.interface';
import './MenuSearch.css';

//* REACT ROUTER DOM
import { useLocation     } from 'react-router-dom';

//* REDUX
import { useDispatch     } from 'react-redux';
import { requestFilterDialogs } from '../../../redux/actionCreators/dialogs';

//* FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch        } from '@fortawesome/free-solid-svg-icons';

//* COMPONENTS
import Button              from '../../../components/Button/Button';
import Input               from '../../../components/Input/Input';

const MenuSearch: FC <Props> = ({className = ''}): any => {
    const [search, setSearch] = useState('');
    const { pathname }: any = useLocation();
    const dispatch    : any = useDispatch();

    //* handleChange function for handle of the search - input
    const handleChange: any = (event: ChangeEvent): void => {
        const target  : any = event.target as HTMLElement;
        const value   : string = target.value;

        console.log(pathname)

        dispatch(requestFilterDialogs(value));
        setSearch(value);
    }

    return (
        <div className={"search " + className}>
            <div className="search__input-wrapper">
                <Button className="search__button">
                    <FontAwesomeIcon className="icon icon_white search__icon" icon={faSearch} />
                </Button>
                <Input className="input-search search__input" placeholder="Search Here..." onChange={handleChange} value={search}/>
            </div>
        </div>
    );
};

export default MenuSearch;