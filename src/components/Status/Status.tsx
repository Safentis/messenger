import React, { FC } from 'react';

import StatusOffline from './StatusOffline/StatusOffline';
import StatusOnline from './StatusOnline/StatusOnline';

import { Props } from './Status.interface';

const Status: FC<Props> = ({ className = '', status }): React.ReactElement => {
  return (
    <>
      {status === 'online' ? (
        <StatusOnline className={className} />
      ) : (
        <StatusOffline className={className} />
      )}
    </>
  );
};

export default Status;
