import { FC             } from 'react';
import { Props          } from './Saved.interface';
import { useDispatch    } from 'react-redux';
import { Link           } from 'react-router-dom';
import { useRouteMatch  } from 'react-router-dom';
import { requestActions } from '../../../../redux/actionCreators/dialogs';
import Button             from '../../../../components/Button/Button';
import Dialog             from '../../../../components/Dialog/Dialog';
import Search             from '../../../../components/Search/Search';
import Stars              from '../../../../components/Stars/Stars';
import useFilterDialogs   from '../../../../Hooks/useFilterDialogs';
import Content            from '../../../../layouts/Content/Content';
import Namebar            from '../../../../layouts/Namebar/Namebar';

const Saved: FC <Props> = ({ dialogs, user: { uid } }) => {


    const dispatch = useDispatch();
    const { url }  = useRouteMatch()

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
    const result: any[] = useFilterDialogs({dialogs, status, uid});

    

    //* -------------------------------------------------------
    //* Content
    const CONTENT: any = result.map(([key, value]: any, index: number) => 
        <Dialog key={index} {...value}>
            <Stars score={value.score}/>
            <Link className="button-action" to={url + '/' + key}>
                proceed
            </Link>
            <Button className="button-action" onClick={handleDelete} data-id={key}>
                delete
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

export default Saved;