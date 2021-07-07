import { FC                  } from 'react';
import { Controls, Props     } from './TextField.interface';
import './TextField.css';

import firebase                from 'firebase';
import { FontAwesomeIcon     } from '@fortawesome/react-fontawesome';
import { faSmile             } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip         } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow     } from '@fortawesome/free-solid-svg-icons';

import TextArea                from './TextArea/TextArea';
import Button                  from '../Button/Button';
import input                   from '../../HOC/input';


const TextField: FC <Props> = ({chatId, value, handleChange, handleSendMessage}): any => {
    return (
        <div className="text-field">
            <TextArea 
                className="textare-chat text-field__textarea"
                placeholder="Type your message here..."
                onChange={handleChange}
                value={value}
            />
            <ul className="text-field__list">
                <li className="text-field__item">
                    <Button 
                        className={`text-field__button text-field__button-smiles`}
                        title="smiles"
                        type="button"
                    >
                        <FontAwesomeIcon 
                            className={`text-field__icon-smiles`} 
                            icon={faSmile}
                        />
                    </Button>
                </li>
                <li className="text-field__item">
                    <Button 
                        className={`text-field__button text-field__button-enclose`}
                        title="enclose"
                        type="button"
                    >
                        <FontAwesomeIcon 
                            className={`text-field__icon-enclose`} 
                            icon={faPaperclip}
                        />
                    </Button>
                </li>
                <li className="text-field__item">
                    <Button 
                        className={`text-field__button text-field__button-send`}
                        onClick={() => handleSendMessage(value, chatId)}
                        title="send"
                        type="button"
                    >
                        <FontAwesomeIcon 
                            className={`text-field__icon-send`} 
                            icon={faLocationArrow}
                        />
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default input(TextField);