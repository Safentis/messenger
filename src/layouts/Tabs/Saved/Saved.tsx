import { FC            } from 'react';
import { useSelector   } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Link          } from 'react-router-dom';
import Dialog            from '../../../components/Dialog/Dialog';

const Saved: FC = (): any => {
    const saves: any[] = useSelector(({dialogsReducer: { saves }}: any) => saves);
    const { url }: any = useRouteMatch();

    return (
        <div>
            {
                saves.map((dialog: any, index: number) =>
                    <Link 
                        key={index} 
                        to={`${url}/${dialog.chatId}`} 
                    >
                        <Dialog {...dialog}/>
                    </Link>
                )
            }
        </div>
    );
};

export default Saved;