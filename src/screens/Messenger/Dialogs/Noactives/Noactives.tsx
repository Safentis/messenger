import { FC, MouseEvent } from 'react';
import { useDispatch    } from 'react-redux';
import InfiniteScroll     from 'react-infinite-scroller';
import { requestActions } from '../../../../redux/actionCreators/dialogs';
import Dialog             from '../../../../components/Dialog/Dialog';
import Line               from '../../../../components/Line/Line';
import Search             from '../../../../components/Search/Search';
import Button             from '../../../../components/Button/Button';
import Content            from '../../../../layouts/Content/Content';
import Namebar            from '../../../../layouts/Namebar/Namebar';
import useFilterDialogs   from '../../../../Hooks/useFilterDialogs';
import useInfiniteScroll  from '../../../../Hooks/useInfiniteScroll';

interface Props {
    dialogs: any[]
}

const Noactives: FC <Props> = ({ dialogs }) => {

    
    const dispatch = useDispatch();


    //* -------------------------------------------------------
    //* We create filter
    const status: string = 'noactive';
    const result: any[] = useFilterDialogs({dialogs, status});



    //* -------------------------------------------------------
    //* Handle of enter
    const handleEnter = async (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const chatId = target.dataset.id;
        const body = {
            status: 'active',
        };
    
        dispatch(requestActions({chatId, body}));
    }

    
    
    //* ---------------------------------------------------------
    //* Logic of loader
    const scroll = useInfiniteScroll({result});
    const { records, loadMore, hasMoreItems, loader } = scroll;


    //* With this function we creat of a Dialog components 
    //* and add them to items array for preload
    const showItems = (dialogs: any[]): any[] => {
        const items: any[] = [];

        if (dialogs.length > 0) {
                
            for (let i = 0; i < records; i++) {
                
                //* If the dialogue is undefined, we skip it
                if (typeof dialogs[i] === 'undefined') 
                {
                    continue;
                } 
                else 
                {
                    const [key, value] = dialogs[i];
                    items.push(
                        <Dialog key={i} {...value}>
                            <Button onClick={handleEnter} data-id={key}>
                                start a dialogue
                            </Button>
                        </Dialog>
                    );
                }
            }
        }

        return items;
    };

    return (
        <>
            <Namebar>
                <Line className="noactive__line"/>
                <Search />
            </Namebar>
            <Content>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadMore}
                    hasMore={hasMoreItems}
                    loader={loader}
                    useWindow={false}
                >
                    {showItems(result)}
                </InfiniteScroll>
            </Content>
        </>
    );
};

export default Noactives;