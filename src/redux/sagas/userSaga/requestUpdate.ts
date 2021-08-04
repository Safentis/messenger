import firebase from "firebase";
import { call, put, StrictEffect } from "redux-saga/effects";

import { RequestProps } from "../sagas.interface";
import { getDownloadURL, handleError } from "../../../utils/functions";
import { ProfileInterface } from "../../../screens/options/Profile/Profile.interface";
import { STANDART_AVATAR } from "../../../utils/consts";
import { FETCH_USER_SET } from "../../actions/user";

export interface RequestUpdateProps {
  closeModal: Function;
  user: ProfileInterface
}

const currentUser = (): Promise<firebase.User | null> => {
  return new Promise((resolve) => {
    return resolve(firebase.auth().currentUser);
  });
};

const updatePassword = (profile: any, newPassword: string): Promise<firebase.User> => {
  return new Promise((resolve) => {
    return resolve(profile.updatePassword(newPassword));
  });
};

const updateProfile = (profile: any, name: string, photo: string): Promise<firebase.User> => {
  return new Promise((resolve) => {
    profile.updateProfile({
      displayName: name,
      photoURL: photo,
    });

    return resolve(profile);
  });
};

const updateFirebaseUser = async ({uid, name, photo}: {uid: string, name: string, photo: string}): Promise<any> => {
  try {
    return await fetch(
      `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          photo: photo || STANDART_AVATAR,
        }),
      }
    );
  } catch(error) {
    console.error('Code: ', error.code);
    console.error('Message: ', error.message);
  }
};

/**
 * @param {object} payload
 * @param {object} payload.user
 * @param {Function} payload.closeModal
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestUpdate({
  payload: { user, closeModal },
}: RequestProps<RequestUpdateProps>): Generator<StrictEffect, void, any> {
  try {
    const { file, uid, password, name }: ProfileInterface = user;
    const storageRef: firebase.storage.Reference = firebase.storage().ref();
    const child: string = "avatars/";

    //* first we get the user
    const profile: firebase.User = yield call(currentUser);
    //* than we set photo to store and get url on store
    const photo: string = yield call(getDownloadURL, storageRef, file, child);

    //* after we change the pasword and update the profile
    yield call(updatePassword, profile, password);
    yield call(updateProfile, profile, name, photo);
    yield call(updateFirebaseUser, {uid, name, photo});

    yield closeModal();
    yield put({
      type: FETCH_USER_SET,
      payload: {
        user: { name, photo },
      },
    });
  } catch (error) {
    handleError(error);
  }
}
