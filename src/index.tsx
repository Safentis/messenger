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
  apiKey           : 'AIzaSyDSbXdhXT4bJ5E28Y98KFRHTsw0d6KFw2g' || env.FIREBASE_API_KEY,
  authDomain       : 'messenger-b15ea.firebaseapp.com' || env.FIREBASE_AUTH_DOMAIN,
  databaseURL      : 'https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app' || env.FIREBASE_DB_URL,
  projectId        : '1:476615363227:web:c784b9a31d6931cf39543e' || env.FIREBASE_PROJECT_ID,
  storageBucket    : 'G-Q02HRV150F' || env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: 'messenger-b15ea.appspot.com' || env.FIREBASE_SENDING_ID,
  appId            : '476615363227' || env.FIREBASE_APP_ID,
  measurementId    : 'messenger-b15ea' || env.FIREBASE_MEASUREMENT_ID
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