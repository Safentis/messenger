import { FC, Fragment  } from 'react';
import { useSelector   } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import Dialog            from '../../../components/Dialog/Dialog';

const Saved: FC = (): any => {
    const saves: any[] = useSelector(({dialogsReducer: { saves }}: any) => saves);
    const { url }: any = useRouteMatch();

    console.log(saves);

    return (
        <div>
            {
                saves.map((dialog: any, index: number) =>
                    <Fragment key={index}>
                        <Dialog {...dialog}/>
                    </Fragment>
                )
            }
        </div>
    );
};

export default Saved;