import React    from 'react';
import ReactDOM from 'react-dom';
import Root     from './screens/Root';

// Redux
import { Provider } from 'react-redux';
import { store    } from './redux/store/store';

//* CSS Files
import 'normalize.css';
import './fonts/DINPro/stylesheet.css'
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);