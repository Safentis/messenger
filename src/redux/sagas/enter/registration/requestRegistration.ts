import { put, call, StrictEffect } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import firebase from 'firebase';

import { Fields } from '../../../../screens/enter/Registration/Registration.interface';
import { EnterSagaProps } from '../../sagas.interface';
import { createFirebaseUser, handleError } from '../../../../utils/functions';
import { FETCH_USER_SET } from '../../../actions/user';
import { TOASTIFY_CONFIG } from '../../../../utils/configs/toastify.config';
import { REGISTRATION_SUCCESS_MESSAGE } from '../../../../utils/consts';
import { FETCH_MESSAGES_FAILURE, FETCH_MESSAGES_SUCCESS } from '../../../actions/authentication';

const fetchRegistration = async ({ email, password }: Fields): Promise<firebase.User> => {
  const userCredential: firebase.auth.UserCredential = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  const user: firebase.User = (await userCredential.user) as firebase.User;

  return user;
};

const getIdToken = async (user: firebase.User): Promise<string> => {
  return await user.getIdToken();
};

/**
 * @param {EnterSagaProps} payload
 * @param {Fields} payload.values
 * @param {object} payload.formik
 * @param {object} payload.histroy
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestRegistration({
  payload: { values, formik, history },
}: EnterSagaProps): Generator<StrictEffect, void, any> {
  try {
    const user: firebase.User = yield call(fetchRegistration, {
      email: values.email,
      password: values.password,
    });

    const token: string = yield call(getIdToken, user);

    //* Function from utils dir
    yield call(createFirebaseUser, user);
    yield put({
      type: FETCH_MESSAGES_SUCCESS,
      payload: {
        token,
      },
    });

    const info = {
      email: user.email,
      name: user.displayName,
      photo: user.photoURL,
      uid: user.uid,
    };

    yield put({
      type: FETCH_USER_SET,
      payload: {
        user: info,
      },
    });

    //* Set SUCCESS status to formik
    formik.setStatus({ state: true, message: REGISTRATION_SUCCESS_MESSAGE });

    //* Set-up toast for an in-app messages
    toast(REGISTRATION_SUCCESS_MESSAGE, TOASTIFY_CONFIG);
  } catch (error) {
    //* Set FAILURE status to formik
    formik.setStatus({ state: false, message: error.message });
    yield put({
      type: FETCH_MESSAGES_FAILURE,
    });
    handleError(error);
  }
}
