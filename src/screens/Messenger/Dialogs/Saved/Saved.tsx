import { FC             } from 'react';
import { useDispatch    } from 'react-redux';
import Button             from '../../../../components/Button/Button';
import Dialog             from '../../../../components/Dialog/Dialog';
import Search             from '../../../../components/Search/Search';
import Stars              from '../../../../components/Stars/Stars';
import useFilterDialogs   from '../../../../Hooks/useFilterDialogs';
import Content            from '../../../../layouts/Content/Content';
import Namebar            from '../../../../layouts/Namebar/Namebar';
import { requestActions } from '../../../../redux/actionCreators/dialogs';

interface Props {
    dialogs: any[]
}

const Saved: FC <Props> = ({ dialogs }) => {


    const dispatch = useDispatch();


    //* -------------------------------------------------------
    //* Handle of delete
    const handleDelete = async (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const chatId = target.dataset.id;
        const body = {
            saved: 'nosaved',
        };
    
        dispatch(requestActions({chatId, body}));
    }



    //* -------------------------------------------------------
    //* We create filter
    const status: string = 'saved';
    const result: any[] = useFilterDialogs({dialogs, status});

    

    //* -------------------------------------------------------
    //* Content
    const CONTENT: any = result.map(([key, value]: any, index: number) => 
        <Dialog key={index} {...value}>
            <Button onClick={handleDelete} data-id={key}>
                delete
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

export default Saved;