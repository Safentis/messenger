import React from 'react';
import './Root.css';

import RootRouter       from './RootRoutes';

function Root() {
  return (
    <main className="main">
      <RootRouter />
    </main>
  );
}

export default Root;