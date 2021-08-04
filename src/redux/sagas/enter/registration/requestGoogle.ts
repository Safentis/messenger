import { call, put, StrictEffect } from "redux-saga/effects";
import firebase from "firebase";

import { createFirebaseUser, handleError } from "../../../../utils/functions";
import { FETCH_MESSAGES_FAILURE, FETCH_MESSAGES_SUCCESS } from "../../../actions/authentication";
import { FETCH_USER_SET } from "../../../actions/user";

const fetchUserAccount = async (): Promise<firebase.User | null> => {
  const provider = await new firebase.auth.GoogleAuthProvider();
  const { user } = await firebase.auth().signInWithPopup(provider);
  return user;
};

const getIdToken = async (user: firebase.User): Promise<string> => {
  return await user.getIdToken();
};

export default function* requestGoogle(): Generator<
  StrictEffect, 
  void, 
  any
> {
  try {
    const user: firebase.User = yield call(fetchUserAccount);
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
  } catch (error) {
    yield put({
      type: FETCH_MESSAGES_FAILURE,
    });
    handleError(error);
  }
}
