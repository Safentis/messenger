import { FC, useState  } from 'react';
import { Props         } from './Dialogs.interface';
import './Dialogs.css';

import _                 from 'lodash';
import InfiniteScroll    from 'react-infinite-scroller';
import Loader            from 'react-loader-spinner';
import Dialog            from '../../../../components/Dialog/Dialog';

const Dialogs: FC <Props> = ({dialogs = [], status, uid}): any => {
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


    const content: any[] = _.filter(dialogs, (dialog: any) => {
        return (dialog.status !== 'noactive')
            ? (
                dialog.status === status && 
                dialog.operatorId.trim() === uid && 
                dialog.operatorId.trim() !== ''
              )
            : dialog.status === status;
    });

    return (
        <>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMoreItems}
                loader={loader}
                useWindow={false}
            >
                {showItems(content)}
          </InfiniteScroll>
        </>
    )
}

export default Dialogs;