import { useState } from 'react';
import Loader       from 'react-loader-spinner';

const infiniteScroll = (Component: any, Dialog: any) => (props: any) => {
    const { dialogs } = props;

    const itemsPerPage: number = 10;
    const [hasMoreItems, sethasMoreItems]: [boolean, Function] = useState(true);
    const [records, setRecords]: [number, Function] = useState(itemsPerPage);


    //* With this function we created of a Dialog components 
    //* and added them to items array for preload
    const showItems = (dialogs: any[]): any[] => {
        const items: any[] = [];
        
        if (dialogs?.length > 0) {
            
            for (var i = 0; i < records; i++) {
                items.push(
                    <Dialog {...dialogs[i]} key={i}/>
                );
            }
        }

        return items;
    };


    //* If a records number was equal to dialogs length
    //* we'll be removing loader
    //* else if records less or equal than dialogs length
    //* we'll be incrementing of the records count
    //* which will bring up more dialogues
    const loadMore = (): void => {
        if (records === dialogs?.length) {
            sethasMoreItems(false);
        } else if (records <= dialogs?.length) {
            setTimeout(() => {
                setRecords(records + itemsPerPage);
            }, 1000);
        } else {
            sethasMoreItems(false);
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

    
    return (
        <Component 
            {...props} 
            showItems={showItems} 
            loadMore={loadMore}
            hasMoreItems={hasMoreItems}
            loader={loader}
        />
    );
};

export default infiniteScroll;