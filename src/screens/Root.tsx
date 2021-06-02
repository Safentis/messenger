import React from 'react';
import './Root.css';

import Authentification from './Authentication/Authentication';

function Root() {
  return (
    <main className="main">
      <Authentification />
    </main>
  );
}

export default Root;