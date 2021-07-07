import { FC     } from 'react';
import { Props  } from './EndDialog.interface';
import './EndDialog.css';

const EndDialog: FC <Props> = () => {
    return (
        <div className="message-complite">
            <p className="message-complite__content">
                Dialog coplited
            </p>
        </div>
    );
};

export default EndDialog;