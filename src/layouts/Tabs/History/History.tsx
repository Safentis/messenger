import { FC, Fragment  } from 'react';
import { useSelector   } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Link          } from 'react-router-dom';
import Dialog            from '../../../components/Dialog/Dialog';

const History: FC = (): any => {
    const actives: any[] = useSelector(({dialogsReducer: { actives }}: any) => actives);
    const { url }: any = useRouteMatch();

    console.log(actives);

    return (
        <div>
            {   
                actives?.length > 0
                    ? actives.map((dialog: any, index: number) =>
                        <Fragment key={index}>
                            <Dialog {...dialog}/>
                        </Fragment>
                    )
                    : null
            }
        </div>
    );
};

export default History;