import React from 'react';
import './Root.css';

import RootRouter       from './RootRoutes';
// import Authentification from './Authentication/Authentication';
// import Messenger        from './Messenger/Messenger';

function Root() {
  return (
    <main className="main">
      {/* <Messenger /> */}
      {/* <Authentification /> */}
      <RootRouter />
    </main>
  );
}

export default Root;