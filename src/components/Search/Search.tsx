import { FC, useEffect, useState } from 'react';
import { Props                   } from './Search.interface';
import { FontAwesomeIcon         } from '@fortawesome/react-fontawesome';
import { faSearch                } from '@fortawesome/free-solid-svg-icons';
import { useDispatch             } from 'react-redux';
import { useSelector             } from 'react-redux';
import { setFilteredDialogs      } from '../../redux/actionCreators/dialogs';
import useSearchHook               from '../../Hooks/useSearchHook';
import Input                       from '../Input/Input';
import './Search.css';

const Search: FC <Props> = (): any => {

    //* ---------------------------------------------------
    //* State search handler
    const [search, setSearch] = useState('');
    const handleSearch = (event: any) => {
        setSearch(event.target.value);
    };

    
    //* ---------------------------------------------------
    //* Search requests
    const dialogs = useSelector((state: any): any[] => {
        return state.dialogsReducer.dialogs;
    });
    
    //* ---------------------------------------------------
    //* Search logic
    useSearchHook({dialogs, search});

    return (
        <div className="search">
            <FontAwesomeIcon 
                className="icon search__icon" 
                icon={faSearch}
            />
            <Input 
                className="search__input" 
                value={search} 
                type="text" 
                placeholder="Search Here"
                onChange={handleSearch}
            />
        </div>
    );
};

export default Search;