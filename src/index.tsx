import React    from 'react';
import ReactDOM from 'react-dom';
import Root     from './screens/Root';

//* CSS Files
import 'normalize.css';
import './fonts/DINPro/stylesheet.css'
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);