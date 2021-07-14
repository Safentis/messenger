import { FC             } from 'react';
import { useDispatch    } from 'react-redux';
import { requestActions } from '../../../../redux/actionCreators/dialogs';
import Button             from '../../../../components/Button/Button';
import Dialog             from '../../../../components/Dialog/Dialog';
import Search             from '../../../../components/Search/Search';
import useFilterDialogs   from '../../../../Hooks/useFilterDialogs';
import Content            from '../../../../layouts/Content/Content';
import Namebar            from '../../../../layouts/Namebar/Namebar';
import Stars              from '../../../../components/Stars/Stars';

interface Props {
    dialogs: any[]
}

const Complited: FC <Props> = ({ dialogs }) => {

    const dispatch = useDispatch();



    //* -------------------------------------------------------
    //* We created save functionality
    const handleSave = async (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const chatId = target.dataset.id;
        const body = {
            saved: 'saved',
        };
    
        dispatch(requestActions({chatId, body}));
    }



    //* -------------------------------------------------------
    //* We create filter
    const status: string = 'complited';
    const result: any[] = useFilterDialogs({dialogs, status});



    //* -------------------------------------------------------
    //* Content
    const CONTENT: any = result.map(([key, value]: any, index: number) => 
        <Dialog key={index} {...value}>
            <Button onClick={handleSave} data-id={key}>
                save
            </Button>
            <Stars score={value.score}/>
        </Dialog>
    );
    return (
        <>
            <Namebar>
                <Search />
            </Namebar>
            <Content>
                {CONTENT}
            </Content>
        </>
    );
};

export default Complited;