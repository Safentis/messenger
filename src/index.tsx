import React             from 'react';
import ReactDOM          from 'react-dom';
import Root              from './screens/Root';

//* REDUX
import { Provider    }   from 'react-redux';
import { PersistGate }   from 'redux-persist/integration/react'
import { store       }   from './redux/store/store';
import { persistor   }   from './redux/store/store';

//* REACT ROUTER
import { BrowserRouter } from 'react-router-dom';

//* FIREBASE
import firebase          from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

//* PUBNUB
import PubNub             from 'pubnub';
import { PubNubProvider } from 'pubnub-react';

//* CSS FILES
import 'normalize.css';
import './fonts/DINPro/stylesheet.css'
import './index.css';

firebase.initializeApp({
  apiKey           : process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain       : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL      : process.env.REACT_APP_FIREBASE_DB_URL,
  projectId        : process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket    : process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDING_ID,
  appId            : process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId    : process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBLISH_KEY,
  subscribeKey: process.env.REACT_APP_SUBSCRIBE_KEY as string,
  uuid: PubNub.generateUUID(),
  ssl: true
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PubNubProvider client={pubnub}>
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </PubNubProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);