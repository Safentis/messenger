import { FC          } from 'react';
import { Props       } from './Dialogs.interface';
import { useSelector } from 'react-redux';
import './Dialogs.css'; 

//* COMPONENTS
import Dialog          from '../../../components/Dialog/Dialog';

const Dialogs: FC <Props> = ({}): any => {
    //* We are getting dialogs object
    const { dialogs }: any = useSelector((state: any) => 
        state.dialogsReducer
    );

    return (
        dialogs.length > 0
            ? dialogs.map((dialog: any, index: number): any => 
                <Dialog key={index} {...dialog}/>
              )
            : <p className="no-dialogs">
                No dialogs found
              </p>
    );
};

export default Dialogs;