import { FC              } from 'react';
import { Controls, Props } from './TextField.interface';
import './TextField.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile         } from '@fortawesome/free-solid-svg-icons';
import { faPaperclip     } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

import TextArea            from '../TextArea/TextArea';
import Button              from '../Button/Button';

const TextField: FC <Props> = ({}): any => {
    
    const controls: Controls = {
        smiles : faSmile,
        enclose: faPaperclip,
        send   : faLocationArrow
    }
    
    const CONTROLS: any = (
        Object
            .entries(controls)
            .map(([name, icon]: [string, any], index: number) => 
                <li className="text-field__item" key={index}>
                    <Button 
                        className={`text-field__button text-field__button-${name}`}
                        title={name}
                        type="button"
                    >
                        <FontAwesomeIcon 
                            className={`text-field__icon-${name}`} 
                            icon={icon}
                        />
                    </Button>
                </li>
            )
    )

    return (
        <div className="text-field">
           <TextArea 
                className="textare-chat text-field__textarea"
                placeholder="Type your message here..."
            />
            <ul className="text-field__list">
                {CONTROLS}
            </ul>
        </div>
    );
}

export default TextField;