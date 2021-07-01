import { FC              } from 'react';
import { Props, Controls } from './Namebar.interface';
import './Namebar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone         } from '@fortawesome/free-solid-svg-icons';
import { faVideo         } from '@fortawesome/free-solid-svg-icons';

import Status              from '../Status/Status';
import Button              from '../Button/Button';

const Namebar: FC <Props> = ({client, online}): any => {

    const controls: Controls = {
        'phone-call': faPhone,
        'video-call': faVideo
    };

    const CONTROLS: any = (
        Object
            .entries(controls)
            .map(([name, icon]: [string, any], index: number) => 
                <li className="namebar__item" key={index}>
                    <Button className="namebar__button">
                        <FontAwesomeIcon 
                            className="namebar__icon icon_white" 
                            icon={icon}
                        />
                    </Button>
                </li>
            )
    );

    return (
        <section className="namebar">
            <div className="namebar__user">
                <Status 
                    className="namebar__status" 
                    status={online}
                />
                <h2 className="namebar__username">
                    {client}
                </h2>
            </div>
            <ul className="namebar__list">
                {CONTROLS}
            </ul>
        </section>
    );
};

export default Namebar;