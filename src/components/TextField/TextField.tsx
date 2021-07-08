import { FC, useState        } from 'react';
import { Props               } from './TextField.interface';
import './TextField.css';

import { FontAwesomeIcon     } from '@fortawesome/react-fontawesome';
import { faSmile             } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip         } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow     } from '@fortawesome/free-solid-svg-icons';
import Picker                  from 'emoji-picker-react';

import TextArea                from './TextArea/TextArea';
import Button                  from '../Button/Button';

const TextField: FC <Props> = ({message, setMessage, sendMessage, handleChange}): any => {

    
    const onEmojiClick = (event: any, emojiObject: any): void => {
        setMessage(message + ` ${emojiObject.emoji}`);
    };

    const [isSubmenu, setSubmenu] = useState(false);
    const handleSubmenu = (): void => {
        setSubmenu(!isSubmenu);
    }

    return (
        <div className="text-field">
            <TextArea 
                className="textare-chat text-field__textarea"
                placeholder="Type your message here..."
                onChange={handleChange}
                value={message}
            />
            <ul className="text-field__list">
                <li className="text-field__item text-field__emoji">
                    <Button 
                        className={`text-field__button text-field__button-smiles`}
                        title="smiles"
                        type="button"
                        onClick={handleSubmenu}
                    >
                        <FontAwesomeIcon 
                            className={`text-field__icon-smiles`} 
                            icon={faSmile}
                        />
                    </Button>
                    <div className={`text-field__emoji-picker ${isSubmenu 
                            ? 'text-field__emoji-picker_show' 
                            : 'text-field__emoji-picker_hide'
                        }`}>
                        <Picker onEmojiClick={onEmojiClick} />
                    </div>
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
                        onClick={() => sendMessage(message)}
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

export default TextField;