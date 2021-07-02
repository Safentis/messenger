import { Children } from 'react';
import Props        from './Label.interface';
import './Label.css';

const Label = ({children = '', className = '', attrs}: Props) => {
    return (
        <label className={`label ${className}`} {...attrs}>
            {
                Children.map(children, (item) => 
                    item
                )
            }
        </label>
    );
};

export default Label;