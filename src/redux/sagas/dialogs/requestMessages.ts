import { call, StrictEffect } from "redux-saga/effects";

interface fetchMessages {
  chatId: string;
  body: any;
}

const fetchMessages = async ({ chatId, body }: fetchMessages): Promise<void> => {
  try {
    await fetch(
      `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatId}/messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

/**
 * @param {object} payload
 * @param {string} payload.chatId 
 * @param {object} payload.body 
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestMessages({
  payload: { chatId, body },
}: any): Generator<StrictEffect, void, any> {
  try {
    yield call(fetchMessages, { chatId, body });
  } catch (error) {
    console.error("Code ", error.code);
    console.error("Message ", error.message);
    throw new Error(`Error in requestMessages: ${error}`);
  }
}
