import { call, StrictEffect } from "redux-saga/effects";
import firebase from "firebase";

import { RequestProps } from "../sagas.interface";
import { handleError } from "../../../utils/functions";

export interface RequestRestore {
  data: {
    values: {
      email: string;
    };
    setStatus: Function;
  };
}

const resetPasswordWithEmail = async (email: string): Promise<void> => {
  return await firebase.auth().sendPasswordResetEmail(email);
};

/**
 * @param {object} payload
 * @param {string} payload.email contains email and password fields
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestRestore({payload: { data } }: RequestProps<RequestRestore>): Generator<
  StrictEffect, 
  void, 
  any
> {
  try {
    yield call(resetPasswordWithEmail, data.values.email);
    data.setStatus(true);
  } catch (error) {
    data.setStatus(false);
    handleError(error);
  }
}
