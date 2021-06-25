import { FC, Fragment  } from 'react';
import { useSelector   } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import Dialog            from '../../../components/Dialog/Dialog';

const Clipboard: FC = (): any => {
    const complites: any[] = useSelector(({dialogsReducer: { complites }}: any) => complites);
    const { url }: any = useRouteMatch();
    return (
        <div>
            {   
                complites?.length > 0
                    ? complites.map((dialog: any, index: number) =>
                        (dialog.complite) 
                            ?
                                <Fragment key={index}>
                                    <Dialog {...dialog}/>
                                </Fragment>
                            : null
                    )
                    : null
            }
        </div>
    );
};

export default Clipboard;