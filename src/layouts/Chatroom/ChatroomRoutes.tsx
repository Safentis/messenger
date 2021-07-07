import { FC            } from 'react';
import { Route         } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { chatRoutes    } from '../../routes';

const ChatroomRoutes: FC = (): any => {
    const { url }: any = useRouteMatch();
    
    return chatRoutes.map(({path, component}: any, index: number): any =>
        <Route 
            key={index}
            path={url + path} 
            component={component} 
        />
    );
};

export default ChatroomRoutes;