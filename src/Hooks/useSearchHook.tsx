import { useEffect           } from 'react';
import _                       from 'lodash';
import { useDispatch         } from 'react-redux';
import { setFilteredDialogs  } from '../redux/actionCreators/dialogs';

interface Props {
    dialogs: any[]
    search : string
}

const useSearchHook = ({dialogs, search}: Props) => {
    
    //* ---------------------------------------------------
    //* Search result
    let dispatch: Function = useDispatch();

    const searchFunc = () => {
        let lowerSearchCase: string = search.toLowerCase();
        let isFiltered     : any[]  = [];
        let noFiltered     : any[]  = [];
        let isEntries      : any
    
        
        //* We search by customer name and if we find 
        //* matches we push the result into the isFiltered array  
        //* else we push result into the noFiltered array for searching
        //* by message
        Object
        .entries(dialogs)
        .filter((dialog: any) => {
            let [key, value] = dialog;
            let lowerClientCase: string = value.client.toLowerCase();
            
            (lowerClientCase.includes(lowerSearchCase))
                ? isFiltered.push(dialog) 
                : noFiltered.push(dialog);
        });


        //* In this case we search by content of a message
        //* and if we searching, we push the result into isFiltered array
        noFiltered.length > 0 && 
        noFiltered.forEach((dialog: any) => {
            let [key, value] = dialog;
            let messages: any = Object.values(value.messages);

            messages.forEach((message: any) => {
                let lowerContentCase: string = message.content.toLowerCase();
                lowerContentCase.includes(lowerSearchCase) &&
                isFiltered.push(dialog);
            });
        });
        

        isFiltered = [...new Set(isFiltered)];
        isEntries  = Object.fromEntries(isFiltered);

        dispatch(setFilteredDialogs(isEntries));
    }

    useEffect(() => {
        let debounce: any;
        
        //* With debounce we make nomuch delay
        debounce = _.debounce(searchFunc, 700);
        debounce();

        return () => {
            debounce = null;
        }
    }, [search]);

    return null;
};

export default useSearchHook;