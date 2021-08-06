import { call, put } from "@redux-saga/core/effects";
import { StrictEffect } from "@redux-saga/types";
import { fetchValidationToken } from "../../../../utils/functions";

import { FETCH_EXITING_APP } from "../../../actions/authentication";

export interface ValidationTokenCheck {
  validation: boolean;
}

interface RequestTokenCheckProps {
  payload: {
    token: string;
  };
}


/**
 * The function calls fetchValidationToken and,
 * depending on the response, despatch or
 * redirect the user to the authentication page
 * @param {object} payload
 * @param {string} payload.type
 * @param {string} payload.token
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestTokenCheck({
  payload: { token },
}: RequestTokenCheckProps): Generator<StrictEffect, void, any> {
  try {
    const { validation }: ValidationTokenCheck = yield call(fetchValidationToken, token);
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
