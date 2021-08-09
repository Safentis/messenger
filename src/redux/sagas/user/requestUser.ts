import { put, StrictEffect } from "redux-saga/effects";
import firebase from 'firebase';

import { FETCH_USER_SET } from "../../actions/user";
import { RequestProps } from '../sagas.interface';
import { handleError } from "../../../utils/functions";
import { UserStore } from "../../reducers/userReducer/userReducer.interface";

export interface RequestUser {
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
    const info: UserStore = {
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
