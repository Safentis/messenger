import { call, StrictEffect } from 'redux-saga/effects';

interface fetchMessages {
    chatId: string
    body  : any
}

const fetchMessages = async ({chatId, body}: fetchMessages) => {

    console.log(body);

    try {
        const update = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };

        const request = await fetch(`https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatId}/messages.json`, update);
        const respone = await request.json();
    } catch (error) {
        console.error(error.code);
        console.error(error.message);
        
    }
}


/**
 * @param {object} payload 
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* requestMessages({ payload: { chatId, body }}: any ): Generator<
    StrictEffect,
    any,
    any
> {
    try {
        
        yield call(fetchMessages, {chatId, body});

    } catch(error) {
        console.error('Code ', error.code)
        console.error('Message ', error.message);
        throw new Error(`Error in requestMessages: ${error}`);
    }
}