import { put, call, StrictEffect } from "redux-saga/effects";
import firebase from "firebase";

import { RequestProps } from "../../sagas.interface";
import { handleError } from "../../../utils/functions";
import { Fields } from '../../../screens/Restore/Restore.interface';

/**
 * @param {object} payload
 * @param {Fields} payload.email contains email and password fields
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestRestore({payload: { email } }: RequestProps<Fields>): Generator<
  StrictEffect, 
  void, 
  any
> {
  try {

    console.log(email);

  } catch (error) {
    handleError(error);
  }
}
