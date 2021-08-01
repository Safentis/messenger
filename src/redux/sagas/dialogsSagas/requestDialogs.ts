import { call, put, StrictEffect } from "redux-saga/effects";
import { FETCH_DIALOGS_SET } from "../../actions/dialogs";

const fetchDialogs = async () => {
  const req = await fetch(
    "https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/chatrooms.json"
  );
  const res = await req.json();

  return res;
};

/**
 * @param {object} payload
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* requestDialogs({
  payload: { dialogs },
}: any): Generator<StrictEffect, any, any> {
  try {
    const dialogs: any[] = yield call(fetchDialogs);

    yield put({
      type: FETCH_DIALOGS_SET,
      payload: {
        dialogs,
      },
    });
  } catch (err) {
    console.error("Code ", err.code);
    console.error("Message ", err.message);
  }
}
