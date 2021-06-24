import { FC, ChangeEvent, useState } from 'react';
import { useEffect                 } from 'react';
import { Props                     } from './MenuSearch.interface';
import './MenuSearch.css';

import firebase                      from 'firebase';
import debounce                      from 'lodash/debounce';
import { FontAwesomeIcon           } from '@fortawesome/react-fontawesome';
import { faSearch                  } from '@fortawesome/free-solid-svg-icons';
import { useDispatch               } from 'react-redux';
import { requestFilterDialogs      } from '../../../redux/actionCreators/dialogs';

import Input                         from '../../../components/Input/Input';

const MenuSearch: FC <Props> = ({className = ''}): any => {
    const [search, setSearch] = useState('');
    const dispatch: any = useDispatch();
    const chatsRef: any = firebase.database().ref('chatrooms');


    //* handleChange function for handle of the search - input
    const handleChange = (event: ChangeEvent): void => {
        const target: any = event.target as HTMLElement;
        const value: string = target.value;

        setSearch(value);
    }

    
    useEffect(() => {
        chatsRef.on('value', (dataSnapshot: any) => {
            const dialogs: any = dataSnapshot.val();
            const filterDialogs: any = debounce(() => {
                return dispatch(
                    requestFilterDialogs(
                        dialogs,
                        search,
                    )
                );
            }, 1500);

            filterDialogs();
        });
    }, [search]);


    return (
        <div className={"search " + className}>
            <div className="search__input-wrapper">
                <FontAwesomeIcon className="icon_white search__icon" icon={faSearch} />
                <Input className="input-search search__input" 
                    placeholder="Search Here..." 
                    onChange={handleChange} 
                    value={search}
                />
            </div>
        </div>
    );
};

export default MenuSearch;