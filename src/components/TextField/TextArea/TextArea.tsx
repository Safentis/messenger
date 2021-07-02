import { FC    } from 'react';
import { Props } from './TextArea.interface';
import './TextArea.css';

const TextArea: FC <Props | any> = ({className = '', ...attrs}): any => {
    return (
        <textarea className={"textarea " + className} {...attrs}>
            
        </textarea>
    );
};

export default TextArea;