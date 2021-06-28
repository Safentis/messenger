import { FC    } from 'react';
import { Props } from './Information.interface';
import './Information.css';

const Information: FC <Props> = (): any => {
    return (
        <aside className="information">
            <div className="information__inner">
                <button className="information__button-close" type="button">
                    close
                </button>
                <div className="avatar information__avatar">

                </div>
            </div>
        </aside>
    );
};

export default Information;