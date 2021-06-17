import { FC    } from 'react';
import { Props } from './Namebar.interface';
import './Namebar.css';

//* COMPONENTS
import Button from '../../components/Button/Button';
import Status from '../../components/Status/Status';

//* FONTAWESOME
import { FontAwesomeIcon  } from '@fortawesome/react-fontawesome';
import { faPhone, faVideo } from '@fortawesome/free-solid-svg-icons';

const Namebar: FC <Props> = ({className = ''}): any => {
    return (
        <div className={"namebar " + className}>
            <div className="namebar__user">
                <Status className="namebar__user-status" status={true}/>
                <h2 className="namebar__user-name">
                    User Name
                </h2>
            </div>
            <ul className="namebar__actions">
                <li>
                    <Button className="button-action namebar__actions-phonecall">
                        <FontAwesomeIcon className="icon_white" icon={faPhone} size="sm"/>
                    </Button>
                </li>
                <li>
                    <Button className="button-action namebar__actions-videocall">
                        <FontAwesomeIcon className="icon_white" icon={faVideo} size="sm"/>
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default Namebar;