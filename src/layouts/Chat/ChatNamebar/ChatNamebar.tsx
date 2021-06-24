import { FC                 } from 'react';
import { Props              } from './ChatNamebar.interface';
import './ChatNamebar.css';

import { FontAwesomeIcon    } from '@fortawesome/react-fontawesome';
import { faPlus             } from '@fortawesome/free-solid-svg-icons';
import { useDispatch        } from 'react-redux';

import Button                 from '../../../components/Button/Button';
import Status                 from '../../../components/Status/Status';
import { requestSaveDialogs } from '../../../redux/actionCreators/dialogs';

const ChatNamebar: FC <Props> = (dialog): any => {
       
    const { client, online }: Props = dialog;
    const dispatch: any = useDispatch();
    
    const handleSave = () => {
        dispatch(
            requestSaveDialogs(dialog)
        );
    }; 

    return (
        <section className="namebar">
            <div className="namebar__inner">
                <div className="namebar__user">
                    <Status className="namebar__status" online={online}/>
                    <h2 className="namebar__username">
                        {client}
                    </h2>
                </div>
                <div className="namebar__functionality">
                    <Button className="namebar__button" onClick={handleSave}>
                        <FontAwesomeIcon className="icon icon_white" icon={faPlus}/>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default ChatNamebar;