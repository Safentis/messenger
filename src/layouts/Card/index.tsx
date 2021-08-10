import React, { FC } from 'react';

import { Props } from './index.interface';
import './index.css';

const Card: FC<Props> = ({ children, className, title }): React.ReactElement => {
  return (
    <>
      <section className={'card ' + className}>
        <div className="inner card__inner">
          <h2 className="title inner__title">{title}</h2>
          {children}
        </div>
      </section>
    </>
  );
};

export default Card;
