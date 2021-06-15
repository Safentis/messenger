import React    from 'react';
import ReactDOM from 'react-dom';
import Root     from './screens/Root';

//* REDUX
import { Provider    } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store       } from './redux/store/store';
import { persistor   } from './redux/store/store';

//* REACT ROUTER
import { BrowserRouter } from 'react-router-dom';

//* FIREBASE
import firebase from 'firebase';
import env      from 'react-dotenv';
import 'firebase/firestore';
import 'firebase/auth';

//* CSS FILES
import 'normalize.css';
import './fonts/DINPro/stylesheet.css'
import './index.css';

firebase.initializeApp({
  apiKey           : env.FIREBASE_API_KEY,
  authDomain       : env.FIREBASE_AUTH_DOMAIN,
  databaseURL      : env.FIREBASE_DB_URL,
  projectId        : env.FIREBASE_PROJECT_ID,
  storageBucket    : env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_SENDING_ID,
  appId            : env.FIREBASE_APP_ID,
  measurementId    : env.FIREBASE_MEASUREMENT_ID
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);