import { FC }     from 'react';
import RootRouter from './RootRoutes';
import './Root.css';

const Root: FC = () => {
  return (
    <main className="main">
      <RootRouter />
    </main>
  );
};

export default Root;