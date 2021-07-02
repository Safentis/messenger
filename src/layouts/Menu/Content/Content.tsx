import { FC            } from 'react';
import { Route,        } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { useSelector   } from 'react-redux';
import { menuRoutes    } from '../../../routes';
import Dialogs           from './Dialogs/Dialogs';

const Content: FC = (): any => {
    const { url }: { url: string } = useRouteMatch();

    //* We got all dialogs and userUid from storage 
    const { dialogs, userUid }: any = useSelector((state: any) => {
        return {
            dialogs: state.menudialogsReducer.dialogs,
            userUid: state.menudialogsReducer.uid,
        };
    });

    return (
        menuRoutes.map(({path, status}, index: number) =>
            <Route path={url + path} key={index}>
                <Dialogs 
                    dialogs={dialogs} 
                    status={status} 
                    uid={userUid}
                />
            </Route>
        )
    );
}

export default Content;