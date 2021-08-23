import React, { FC } from 'react';

import { Props } from './index.interface';
import './index.css';

const Content: FC<Props> = ({ children, className = '' }) => {
  return (
    <section className={'content ' + className}>
      <div className="content__inner">{children}</div>
    </section>
  );
};

export default Content;
