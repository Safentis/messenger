import firebase from 'firebase';
import { FetchActions } from '../redux/sagas/dialogs/requestActions';
import { FetchMessages } from '../redux/sagas/dialogs/requestMessages';
import { ValidationTokenCheck } from '../redux/sagas/enter/authentication/requestTokenCheck';

import { SERVER_URL, STANDART_AVATAR } from './consts';

export const getDownloadURL = (
  storageRef: firebase.storage.Reference,
  picture: any,
  child: string,
) => {
  return new Promise(resolve => {
    let uploadTask = storageRef.child(child + picture.name).put(picture);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log('Upload is running');
            break;
        }
      },
      (error: any) => {
        switch (error.code) {
          case 'storage/unauthorized':
            throw new Error(`User doesn't have permission to access the object`);
          case 'storage/canceled':
            throw new Error(`User canceled the upload`);
          case 'storage/unknown':
            throw new Error(`Unknown error occurred, inspect error.serverResponse`);
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
          console.log('File available at', downloadURL);
          resolve(downloadURL);
        });
      },
    );
  });
};

export const handleError = (error: Error): never | void => {
  console.error(error);
  console.error(error.message);
  console.error(error.stack);
};

//* ------------------------------------------------------------------------------------------
//* Firebase manipulation
export const fetchActions = async ({ chatId, body }: FetchActions) => {
  try {
    await fetch(
      `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatId}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

export const fetchMessages = async ({ chatId, body }: FetchMessages): Promise<void> => {
  try {
    await fetch(
      `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatId}/messages.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );
  } catch (error) {
    console.error(error.code);
    console.error(error.message);
  }
};

export const createFirebaseUser = async (user: firebase.User): Promise<void> => {
  try {
    await fetch(
      `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/users/${user.uid}.json`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.displayName || user.email,
          email: user.email,
          photo: user.photoURL || STANDART_AVATAR,
        }),
      },
    );
  } catch (error) {
    handleError(error);
  }
};

export const updateFirebaseUser = async ({
  uid,
  name,
  photo,
}: {
  uid: string;
  name: string;
  photo: string;
}): Promise<any> => {
  try {
    return await fetch(
      `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          photo: photo || STANDART_AVATAR,
        }),
      },
    );
  } catch (error) {
    handleError(error);
  }
};

export const handleSolution = async (
  chatId: string,
  messageId: string | number,
  isSolution: boolean,
) => {
  try {
    const req = await fetch(
      `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/chatrooms/${chatId}/messages/${messageId}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          solution: isSolution,
        }),
      },
    );

    console.log(await req.json());
  } catch (error) {
    handleError(error);
  }
};

//* ------------------------------------------------------------------------------------------
//* ADMIN SDK
export async function fetchValidationToken(
  token: string,
): Promise<ValidationTokenCheck | undefined> {
  try {
    const req = await fetch(SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    });
    return await req.json();
  } catch (error) {
    handleError(error);
  }
}

export const fetchUpdatePassword = async (password: string, email: string): Promise<void> => {
  try {
    const req = await fetch(SERVER_URL + '/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
      }),
    });
    return await req.json();
  } catch (error) {
    handleError(error);
  }
};

export const handleSignalsNotification = async (chatId: string): Promise<void> => {
  try {
    await fetch(SERVER_URL + '/notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: chatId,
      }),
    });
  } catch (error) {
    handleError(error);
  }
};
