import { call, put               } from '@redux-saga/core/effects';
import { StrictEffect            } from '@redux-saga/types';
import { EXITING_THE_APPLICATION } from '../actions/authentication';
import { reqValidationToken      } from './calls/calls';

/**
 * The function calls reqValidationToken and, 
 * depending on the response, despatch or 
 * redirect the user to the authentication page
 * @param {object} payload 
 * @param {string} payload.type
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* requestTokenCheck({payload: { token }}: any): Generator<
  StrictEffect,
  any,
  any
> {
  try {
    const { validation }: any = yield call(reqValidationToken, token);
  
    //* if validation false we exiting from application
    if (!validation) {
      yield put({
        type: EXITING_THE_APPLICATION
      });
    }

  } catch(err) {
    console.error('Code ', err.code)
    console.error('Message ', err.message);
  } finally {
    console.log('requestTokenCheck End')
  }
} 