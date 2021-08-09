import { call, StrictEffect } from "redux-saga/effects";

import { RequestProps } from "../sagas.interface";
import { Message } from "../../../screens/Root.interface";
import { fetchMessages } from "../../../utils/functions";

export interface FetchMessages {
  chatId: string;
  body: Message;
}

/**
 * @param {object} payload
 * @param {string} payload.chatId 
 * @param {object} payload.body 
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestMessages({
  payload: { chatId, body },
}: RequestProps<FetchMessages>): Generator<StrictEffect, void, any> {
  try {
    yield call(fetchMessages, { chatId, body });
  } catch (error) {
    console.error("Code ", error.code);
    console.error("Message ", error.message);
    throw new Error(`Error in requestMessages: ${error}`);
  }
}
