import { FC, useState        } from 'react';
import { Props               } from './Inputbar.interface';
import { FontAwesomeIcon     } from '@fortawesome/react-fontawesome';
import { faSmile             } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip         } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow     } from '@fortawesome/free-solid-svg-icons';
import Picker                  from 'emoji-picker-react';
import Input                   from '../../../../components/Input/Input';
import Button                  from '../../../../components/Button/Button';

import './Inputbar.css';

const Inputbar: FC <Props> = ({children, className = '', inputbar, setInputbar, handleKeyUp}) => {

    //* ---------------------------------------------
    //* Emoji show logic
    const [isEmoji, setEmoji] = useState(false);
    const handleEmojiShow = () => {
        setEmoji(!isEmoji);
    }
    

    //* ---------------------------------------------
    //* Inputbar and emoji handlers
    const handleChange = (event: any) => {
        setInputbar(event.target.value);
    }

    const onEmojiClick = (event: any, emojiObject: any) => {
        setInputbar(inputbar + ' ' + emojiObject.emoji);
    };


    //* ---------------------------------------------
    //* Content
    const MESSAGES_EMOJI = (
        isEmoji
            ? <div className="inputbar__emoji emoji">
                <Picker onEmojiClick={onEmojiClick} />
              </div>
            : null
    );

    return (
        <div className={"inputbar " + className}>
            <Input 
                className="inputbar__field" 
                placeholder="Type your message here..."
                value={inputbar}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
            />
            <ul className="inputbar__list">
                <li className="inputbar__item">
                    <Button className="inputbar__button" onClick={handleEmojiShow}>
                        <FontAwesomeIcon 
                            className="icon_white inputbar__icon" 
                            icon={faSmile}
                        />
                    </Button>
                    {MESSAGES_EMOJI}
                </li>
                <li className="inputbar__item">
                    <Button className="inputbar__button">
                        <FontAwesomeIcon 
                            className="icon_white inputbar__icon" 
                            icon={faPaperclip}
                        />
                    </Button>
                </li>
                <li className="inputbar__item">
                    <Button className="inputbar__button">
                        <FontAwesomeIcon 
                            className="icon_white inputbar__icon" 
                            icon={faLocationArrow}
                        />
                    </Button>
                </li>
            </ul>
            <div className="inputbar__content">
                {children}
            </div>
        </div>
    );
};

export default Inputbar;