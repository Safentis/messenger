import { useState } from 'react';
import Loader       from 'react-loader-spinner';

const useInfiniteScroll = ({result}: any) => {

    const itemsPerPage: number = 2;
    const [hasMoreItems, sethasMoreItems]: [boolean, Function] = useState(true);
    const [records, setRecords]: [number, Function] = useState(itemsPerPage);
    

    //* If a records number was equal to dialogs length
    //* we'll be removing loader
    //* else if records less or equal than dialogs length
    //* we'll be incrementing of the records count
    //* which will bring up more dialogues
    const loadMore = (): void => {
        
        if (records === result.length) {
            sethasMoreItems(false);
        } else {
            setTimeout(() => {
                setRecords(records + itemsPerPage);
            }, 2000);
        }
    };

    
    const loader: any = (
        <div className="loader" key={0}>
            <Loader 
                type="ThreeDots" 
                color="#757b92" 
                height={100} 
                width={100}
            />
        </div>
    );

    
    return {
        records,
        loadMore,
        hasMoreItems,
        loader,
    }
};

export default useInfiniteScroll;