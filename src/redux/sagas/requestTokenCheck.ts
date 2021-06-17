import { call, put }                     from "@redux-saga/core/effects";
import { StrictEffect }                  from "@redux-saga/types";
import { EXITING_THE_APPLICATION }       from "../actions/authentication";

function reqValidationToken(token: string) {
    return fetch('https://messenger-token-checker.herokuapp.com/', {
        method : 'POST',
        headers: {
            'Content-Type'  : 'application/json',
            'x-access-token': token,
        }
    });
}

export default function* requestTokenCheck({payload: { token }}: any): Generator<
  StrictEffect,
  any,
  any
> {
  try {
    const req: any = yield call(reqValidationToken, token);
    const res: any = yield req.json();
    const { validation } = res;

    validation
        ? console.log('Token is', validation)
        : put({type: EXITING_THE_APPLICATION}) 

  } catch(err) {
      console.error('Code ', err.code)
      console.error('Message ', err.message);
  }
} 