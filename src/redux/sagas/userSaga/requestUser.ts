import { put, StrictEffect } from "redux-saga/effects";
import { FETCH_USER_SET } from "../../actions/user";
import { UserStore } from "../../reducers/userReducer/userReducer.interface";
import { RequestProps } from '../sagas.interface';
import firebase from 'firebase';
import { handleError } from "../../../utils/functions";

interface RequestUser {
  user: firebase.User;
}

/**
 * @param {object} payload
 * @param {RequestUser} payload.user
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestUser({ payload: { user }}: RequestProps<RequestUser>): Generator<
  StrictEffect, 
  void, 
  any
> {
  try {
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
    handleError(error);
  }
}
