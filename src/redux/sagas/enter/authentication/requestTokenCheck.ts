import { call, put } from "@redux-saga/core/effects";
import { StrictEffect } from "@redux-saga/types";

import { FETCH_EXITING_APP } from "../../../actions/authentication";

interface Validation {
  validation: boolean;
}

interface RequestTokenCheckProps {
  payload: {
    token: string;
  };
}

// http://localhost:8080/
// https://messenger-token-checker.herokuapp.com/
export function reqValidationToken(token: string): Promise<object> {
  return fetch("https://messenger-token-checker.herokuapp.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  }).then((res) => res.json());
}

/**
 * The function calls reqValidationToken and,
 * depending on the response, despatch or
 * redirect the user to the authentication page
 * @param {object} payload
 * @param {string} payload.type
 * @param {string} payload.token
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* requestTokenCheck({
  payload: { token },
}: RequestTokenCheckProps): Generator<StrictEffect, any, any> {
  try {
    const { validation }: Validation = yield call(reqValidationToken, token);

    //* if validation false we exiting from application
    if (!validation) {
      yield put({
        type: FETCH_EXITING_APP,
      });
    }
  } catch (err) {
    console.error("Code ", err.code);
    console.error("Message ", err.message);
  }
}
