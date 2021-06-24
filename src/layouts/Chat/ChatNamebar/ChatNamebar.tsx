import { FC                 } from 'react';
import { Props              } from './ChatNamebar.interface';
import './ChatNamebar.css';

import { FontAwesomeIcon    } from '@fortawesome/react-fontawesome';
import { faPlus             } from '@fortawesome/free-solid-svg-icons';
import { useDispatch        } from 'react-redux';
import moment                 from 'moment'

import Button                 from '../../../components/Button/Button';
import Status                 from '../../../components/Status/Status';
import { requestSaveDialogs } from '../../../redux/actionCreators/dialogs';

const ChatNamebar: FC <Props> = (dialog): any => {
       
    const { client, online, timestamp }: Props = dialog;
    const dispatch: any = useDispatch();
    
    const handleSave = () => {
        dispatch(
            requestSaveDialogs(dialog)
        );
    };

    const date: any = moment(timestamp);
    const now : number = date.fromNow();

    return (
        <section className="namebar">
            <div className="namebar__inner">
                <div className="namebar__user">
                    <Status className="namebar__status" online={online}/>
                    <h2 className="namebar__username">
                        {client}
                    </h2>
                    <p className="namebar__last-visit">
                        last activity: {now}
                    </p>
                </div>
                <div className="namebar__functionality">
                    <Button className="namebar__button" onClick={handleSave} title="Save dialog">
                        <FontAwesomeIcon className="icon icon_white" icon={faPlus}/>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default ChatNamebar;