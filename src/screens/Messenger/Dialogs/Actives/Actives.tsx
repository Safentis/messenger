import { FC, MouseEvent } from 'react';
import { useDispatch    } from 'react-redux';
import Dialog             from '../../../../components/Dialog/Dialog';
import Search             from '../../../../components/Search/Search';
import Content            from '../../../../layouts/Content/Content';
import Namebar            from '../../../../layouts/Namebar/Namebar';
import Button             from '../../../../components/Button/Button';
import useFilterDialogs   from '../../../../Hooks/useFilterDialogs';
import { requestActions } from '../../../../redux/actionCreators/dialogs';

interface Props {
    dialogs: any[]
}

const Actives: FC < Props> = ({ dialogs }) => {

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
    //* We created save functionality
    const handleProceed = (event: MouseEvent) => {

    }

    
    //* -------------------------------------------------------
    //* We create filter
    const status: string = 'active';
    const result: any[] = useFilterDialogs({dialogs, status});


    //* -------------------------------------------------------
    //* Content
    const CONTENT: any = result.map(([key, value]: any, index: number) => 
        <Dialog key={index} {...value}>
            <Button onClick={handleSave} data-id={key}>
                save
            </Button>
            <Button onClick={handleProceed} data-id={key}>
                proceed
            </Button>
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

export default Actives;