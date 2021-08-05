import { call, StrictEffect } from "redux-saga/effects";
import { toast } from "react-toastify";

import { fetchUpdatePassword, handleError } from "../../../../utils/functions";
import { EnterSagaProps } from "../../sagas.interface";
import { TOASTIFY_CONFIG } from "../../../../utils/configs/toastify.config";
import { 
  UPDATE_SUCCESS_MESSAGE, 
  AUTHENTICATION_ROUTE, 
} from "../../../../utils/consts";


/**
 * @param {EnterSagaProps} payload
 * @param {object} payload.values
 * @param {object} payload.formik
 * @param {object} payload.histroy
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestUpdatePassword({payload: { values, formik, history } }: EnterSagaProps ): Generator<
  StrictEffect, 
  void, 
  any
> {
  try {
    const urlParams = new URLSearchParams(history.location.search);
    
    //* Params for request
    const email: string = urlParams.get('email') as string;
    const newPass: string = values.password as string;
    
    //* Update pasword with admin sdk
    const answer = yield call(fetchUpdatePassword, newPass, email);
    
    if (answer.user) {
      //* Reddirect to '/authentication'
      history.push(AUTHENTICATION_ROUTE);

      //* Set SUCCESS status to formik
      formik.setStatus({state: true, message: UPDATE_SUCCESS_MESSAGE});
      
      // * Set-up toast for an in-app messages
      toast(UPDATE_SUCCESS_MESSAGE, TOASTIFY_CONFIG);
    } else {
      //* Set SUCCESS status to formik
      formik.setStatus({state: false, message: 'Failed to update password'});
    }
    
  } catch (error) {
    formik.setStatus({state: false, message: error.message});
    handleError(error);
  }
}
