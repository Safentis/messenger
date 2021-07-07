import { FC, useState        } from 'react';
import { Controls, Props     } from './TextField.interface';
import './TextField.css';

import { FontAwesomeIcon     } from '@fortawesome/react-fontawesome';
import { faSmile             } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip         } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow     } from '@fortawesome/free-solid-svg-icons';
import Picker                  from 'emoji-picker-react';

import TextArea                from './TextArea/TextArea';
import Button                  from '../Button/Button';
import input                   from '../../HOC/input';
import Submenu                 from '../Submenu/Submenu';

const TextField: FC <Props> = ({chatId, handleSendMessage}): any => {

    let [value, setValue] = useState('');
    const handleChange = (event: any) => {
        setValue(event.target.value);
    }

    
    const onEmojiClick = (event: any, emojiObject: any) => {
        setValue(value += ` ${emojiObject.emoji}`)
    };


    const [isSubmenu, setSubmenu] = useState(false);
    const handleSubmenu = () => {
        setSubmenu(!isSubmenu);
    }


    return (
        <div className="text-field">
            <TextArea 
                className="textare-chat text-field__textarea"
                placeholder="Type your message here..."
                onChange={handleChange}
                value={value}
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

export default TextField;