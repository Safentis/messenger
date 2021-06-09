import { FC    } from 'react';
import { Props } from './Dialogs.interface';
import './Dialogs.css';

//* FONTAWESOME
import { FontAwesomeIcon                } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEllipsisV      } from '@fortawesome/free-solid-svg-icons';
import { faHistory, faUserFriends       } from '@fortawesome/free-solid-svg-icons';
import { faAddressBook, faClipboardList } from '@fortawesome/free-solid-svg-icons';

//* COMPONENTS
import Button from '../../../components/Button/Button';
import Input  from '../../../components/Input/Input';

const Dialogs: FC <Props> = ({}) => {
    return (
        <section className="dialogs">
            <div className="header dialogs__header">
                <h2 className="header__logo">
                    Wehelp
                </h2>
                <ul className="controls header__controls">
                    <li className="controls__item">
                        <Button>
                            <FontAwesomeIcon className="icon controls__icon" icon={faPlusCircle}/>
                        </Button>
                    </li>
                    <li className="controls__item">
                        <Button>
                            <FontAwesomeIcon className="icon controls__icon" icon={faEllipsisV}/>
                        </Button>
                    </li>
                </ul>
            </div>
            <div className="dialogs__searh">
                <Input className="input-search"/>
            </div>
            <ul className="tabs dialog__tabs">
                <li className="tabs__item">
                    <Button>
                        <FontAwesomeIcon className="tabs__icon" icon={faHistory}/>
                    </Button>
                </li>
                <li className="tabs__item">
                    <Button>
                        <FontAwesomeIcon className="tabs__icon" icon={faUserFriends}/>
                    </Button>
                </li>
                <li className="tabs__item">
                    <Button>
                        <FontAwesomeIcon className="tabs__icon" icon={faAddressBook}/>
                    </Button>
                </li>
                <li className="tabs__item">
                    <Button>
                        <FontAwesomeIcon className="tabs__icon" icon={faClipboardList}/>
                    </Button>
                </li>
            </ul>
            <ul className="users dialog__users">
                <li>PASHA</li>
                <li>MASHA</li>
            </ul>
        </section>
    );
};

export default Dialogs;