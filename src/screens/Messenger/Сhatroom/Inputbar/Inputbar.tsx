import { FC, useState        } from 'react';
import { Props               } from './Inputbar.interface';
import { FontAwesomeIcon     } from '@fortawesome/react-fontawesome';
import { faSmile             } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip         } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow     } from '@fortawesome/free-solid-svg-icons';
import Picker                  from 'emoji-picker-react';
import ImageUploader           from 'react-images-upload';
import Input                   from '../../../../components/Input/Input';
import Button                  from '../../../../components/Button/Button';

import './Inputbar.css';

const Inputbar: FC <Props> = ({children, className = '', inputbar, setInputbar, handleKeyUp, sendMessage, handleDrop}) => {

    //* ---------------------------------------------
    //* Input handlers
    const handleChange = (event: any) => {
        setInputbar(event.target.value);
    }
    

    //* ---------------------------------------------
    //* Picture handler
    const [isPicture, setIsPicture] = useState(false);

    const MESSAGES_PICTURE = (
        isPicture
            ? <div className="inputbar__picture picture">
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={handleDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
              </div> 
            : null
    );


    //* ---------------------------------------------
    //* Emoji handler
    const [isEmoji, setEmoji] = useState(false);
    
    const onEmojiClick = (event: any, emojiObject: any) => {
        setInputbar(inputbar + ' ' + emojiObject.emoji);
    };

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
                    <Button className="inputbar__button" onClick={() => {
                        setEmoji(!isEmoji);
                        setIsPicture(false);
                    }}>
                        <FontAwesomeIcon 
                            className="icon_white inputbar__icon" 
                            icon={faSmile}
                        />
                    </Button>
                    {MESSAGES_EMOJI}
                </li>
                <li className="inputbar__item">
                    <Button className="inputbar__button" onClick={() => {
                        setEmoji(false);
                        setIsPicture(!isPicture);
                    }}>
                        <FontAwesomeIcon 
                            className="icon_white inputbar__icon" 
                            icon={faPaperclip}
                        />
                    </Button>
                    {MESSAGES_PICTURE}
                </li>
                <li className="inputbar__item">
                    <Button className="inputbar__button" onClick={() => sendMessage(inputbar)}>
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