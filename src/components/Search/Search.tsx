import { FC, useEffect      } from 'react';
import { Props              } from './Search.interface';
import './Search.css';

import * as _                 from 'lodash';
import firebase               from 'firebase';
import { useDispatch        } from 'react-redux';
import { FontAwesomeIcon    } from '@fortawesome/react-fontawesome';
import { faSearch           } from '@fortawesome/free-solid-svg-icons';
import { DATABASE_CHATROOMS } from '../../utils/consts';
import { requestDialogs     } from '../../redux/actionCreators/menudialogs';
import Input                  from '../Input/Input';
import input                  from '../../HOC/input';

const Search: FC <Props> = ({value, handleChange}): any => {

    const dispath: any = useDispatch();

    //* We create link to the chatrooms
    const chatroomsRef: any = (
        firebase
            .database()
            .ref(DATABASE_CHATROOMS)
    );

    //* We make request to the database, that to take dialogs
    useEffect(() => {

        (_.debounce(() => {
            chatroomsRef
                .on('value', (data: any) => {
                    let database: any[] = data.val();
                    let search: string = value.trim().toLowerCase();
                    
                    let isFiltered: any[] = []; //* filtered messages
                    let noFiltered: any[] = []; //* Not filtered messages
                    
                    //* The first call is filters all dialogs by client name
                    //* and if it's has similarities we pushes dialog in isFiltered
                    //* else we pushing to the notFiltered
                    database.filter((dialog: any) => {
                        let client: string = dialog.client.trim().toLowerCase();

                        if (client.includes(search)) {
                            isFiltered.push(dialog);
                        } else {
                            noFiltered.push(dialog);
                        }
                    });

                    //* After search by client name, we make new filter
                    //* by the messages content
                    for (let dialog of noFiltered) {
                        let messages: any[] = dialog.messages; 

                        if (messages) {
                            messages.filter((message: any) => {
                                let content: string = message.content.trim().toLowerCase();
                                
                                //* If we will be founding similarities
                                //* we will be pushing them to isFiltered array
                                if (content.includes(search)) {
                                    isFiltered.push(dialog)
                                }
                            });
                        }

                    }

                    //* With help of the Set we are deleting all dublicates
                    let noDublicate: any = new Set(isFiltered);
                    let newFiltered: any[] = Array.from(noDublicate);

                    isFiltered = newFiltered;

                    dispath(requestDialogs(isFiltered));
                     
                    console.log('filter', isFiltered);
                });
                
            }, 1000))();
     
        }, [value]);
        
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