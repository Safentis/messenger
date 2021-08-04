import { call, StrictEffect } from "redux-saga/effects";

interface FetchActions {
  chatId: string;
  body: any;
}

const fetchActions = async ({ chatId, body }: FetchActions) => {
  try {
    const update = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const request = await fetch(
      `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatId}.json`,
      update
    );
    const respone = await request.json();
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

/**
 * @param {object} payload
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* requestActions({
  payload: { chatId, body },
}: any): Generator<StrictEffect, any, any> {
  try {
    yield call(fetchActions, { chatId, body });
  } catch (err) {
    console.error("Code ", err.code);
    console.error("Message ", err.message);
  }
}
