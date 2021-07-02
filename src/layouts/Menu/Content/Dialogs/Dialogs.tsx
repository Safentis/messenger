import { FC            } from 'react';
import { Props         } from './Dialogs.interface';
import './Dialogs.css';

import _                 from 'lodash';
import InfiniteScroll    from 'react-infinite-scroller';
import infiniteScroll    from '../../../../HOC/infinite-scroll';
import Dialog            from '../../../../components/Dialog/Dialog';



const Dialogs: FC <Props> = ({dialogs = [], status, uid, loadMore, hasMoreItems, loader, showItems}): any => {

    const filteredContent: any[] = _.filter(dialogs, (dialog: any) => {
        return (dialog.status !== 'noactive')
            ? (
                dialog.status === status && 
                dialog.operatorId.trim() === uid && 
                dialog.operatorId.trim() !== ''
              )
            : dialog.status === status;
    });

    return (
        <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMoreItems}
            loader={loader}
            useWindow={false}
        >
            {showItems(filteredContent)}
        </InfiniteScroll>
    )
}

export default infiniteScroll(Dialogs, Dialog);