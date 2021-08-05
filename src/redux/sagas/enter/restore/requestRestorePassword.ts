import { call, StrictEffect } from "redux-saga/effects";
import { toast } from "react-toastify";
import firebase from "firebase";

import { EnterSagaProps } from "../../sagas.interface";
import { handleError } from "../../../../utils/functions";
import { TOASTIFY_CONFIG } from "../../../../utils/configs/toastify.config";
import {RESTORE_SUCCESS_MESSAGE} from "../../../../utils/consts";

const resetPasswordWithEmail = async (email: string): Promise<void> => {
  return await firebase.auth().sendPasswordResetEmail(email);
};

/**
 * @param {EnterSagaProps} payload
 * @param {object} payload.values
 * @param {object} payload.formik
 * @param {object} payload.histroy
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestRestorePassword({
  payload: { values, formik, history },
}: EnterSagaProps): Generator<StrictEffect, void, any> {
  try {
    yield call(resetPasswordWithEmail, values.email);
    
    // history.push(UPDATE_PASSWORD_ROUTE);

    //* Set SUCCESS status to formik
    formik.setStatus({ state: true, message: RESTORE_SUCCESS_MESSAGE });
      
    //* Set-up toast for an in-app messages
    toast(RESTORE_SUCCESS_MESSAGE, TOASTIFY_CONFIG);
  } catch (error) {
    //* Set FAILURE status to formik
    formik.setStatus({ state: false, message: error.message });
    handleError(error);
  }
}
