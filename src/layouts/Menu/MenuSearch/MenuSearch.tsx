import { FC, ChangeEvent, useState } from 'react';
import { useEffect                 } from 'react';
import { Props                     } from './MenuSearch.interface';
import './MenuSearch.css';

import debounce                      from 'lodash/debounce';
import { useLocation               } from 'react-router-dom';
import { useDispatch               } from 'react-redux';
import { FontAwesomeIcon           } from '@fortawesome/react-fontawesome';
import { faSearch                  } from '@fortawesome/free-solid-svg-icons';

import { requestFilterDialogs      } from '../../../redux/actionCreators/dialogs';
import Button                        from '../../../components/Button/Button';
import Input                         from '../../../components/Input/Input';

const MenuSearch: FC <Props> = ({className = ''}): any => {
    const [search, setSearch] = useState('');
    const dispatch    : any = useDispatch();
    const { pathname }: any = useLocation();
    
    //* handleChange function for handle of the search - input
    const handleChange = (event: ChangeEvent): void => {
        const target  : any = event.target as HTMLElement;
        const value   : string = target.value;

        // console.log(pathname)
        setSearch(value);
    }
    
    useEffect(() => {
        const filterDialogs = debounce(() => {
            return dispatch(
                requestFilterDialogs(search)
            );
        }, 500);
        
        filterDialogs();
    }, [search]);

    return (
        <div className={"search " + className}>
            <div className="search__input-wrapper">
                <FontAwesomeIcon className="icon_white search__icon" icon={faSearch} />
                <Input className="input-search search__input" placeholder="Search Here..." onChange={handleChange} value={search}/>
            </div>
        </div>
    );
};

export default MenuSearch;