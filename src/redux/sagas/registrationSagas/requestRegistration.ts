import { put, call, StrictEffect } from "redux-saga/effects";
import firebase from "firebase";

import { createFirebaseUser, handleError } from "../../../utils/functions";
import { Fields } from "../../../screens/Registration/Registration.interface";
import { FETCH_USER_SET } from "../../actions/user";
import {
  FETCH_MESSAGES_FAILURE,
  FETCH_MESSAGES_SUCCESS,
} from "../../actions/authentication";


export interface RequestRegistration {
  values: Fields;
  setStatus: Function;
}

interface RequestRegistrationProps {
  payload: RequestRegistration;
}

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
 * @param {object} payload
 * @param {Fields} values contains email and password fields
 * @param {function} setStatus is function for handle of form status with api formik
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestRegistration({
  payload: { values, setStatus },
}: RequestRegistrationProps): Generator<StrictEffect, void, any> {
  try {
    const user: firebase.User = yield call(fetchRegistration, {
      email: values.email,
      password: values.password,
    });
    
    const token: string = yield call(getIdToken, user);

    yield call(createFirebaseUser, user); // function in utils dir
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

    setStatus(true);
  } catch (error) {
    setStatus(false);
    yield put({
      type: FETCH_MESSAGES_FAILURE,
    });
    handleError(error);
  }
}
