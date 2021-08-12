import { FC } from 'react';

import { Props } from './Button.interface';
import './Button.css';

const Button: FC<Props | any> = ({
  children = '',
  className = '',
  ...attrs
}): React.ReactElement => {
  return (
    <button className={`button ${className}`} {...attrs}>
      {children}
    </button>
  );
};

export default Button;
