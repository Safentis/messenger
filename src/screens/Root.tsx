import React from 'react';
import './Root.css';

import Authentification from './Authentication/Authentication';
// import Messenger        from './Messenger/Messenger';

function Root() {
  return (
    <main className="main">
      {/* <Messenger /> */}
      <Authentification />
    </main>
  );
}

export default Root;