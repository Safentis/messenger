import { Children, FC } from 'react';

import Props from './Label.interface';
import './Label.css';

const Label: FC<Props> = ({ children = '', className = '', attrs }): React.ReactElement => {
  return (
    <label className={`label ${className}`} {...attrs}>
      {Children.map(children, item => item)}
    </label>
  );
};

export default Label;
