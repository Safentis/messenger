import { FC                 } from 'react';
import { Props              } from './ChatNamebar.interface';
import './ChatNamebar.css';

import moment                 from 'moment'
import Status                 from '../../../components/Status/Status';

const ChatNamebar: FC <Props> = ({ client, online, timestamp }): any => {
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
            </div>
        </section>
    );
};

export default ChatNamebar;