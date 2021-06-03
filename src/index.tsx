import React    from 'react';
import ReactDOM from 'react-dom';
import Root     from './screens/Root';

// REDUX
import { Provider } from 'react-redux';
import { store    } from './redux/store/store';

//* FIREBASE
import firebase from 'firebase';
import env      from 'react-dotenv';
import 'firebase/firestore';
import 'firebase/auth';

//* CSS Files
import 'normalize.css';
import './fonts/DINPro/stylesheet.css'
import './index.css';

firebase.initializeApp({
  apiKey: env.FIREBASE_API_KEY,
  authDomain: "messenger-b15ea.firebaseapp.com",
  databaseURL: env.FIREBASE_DB_URL,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: "messenger-b15ea.appspot.com",
  messagingSenderId: "476615363227",
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);