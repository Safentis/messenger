import firebase from 'firebase';
import { toast } from 'react-toastify';
import { call, put, StrictEffect } from 'redux-saga/effects';

import { RequestProps } from '../sagas.interface';
import { getDownloadURL, handleError, updateFirebaseUser } from '../../../utils/functions';
import { ProfileInterface } from '../../../screens/options/Profile/Profile.interface';
import { FETCH_USER_SET } from '../../actions/user';
import { TOASTIFY_CONFIG } from '../../../utils/configs/toastify.config';

export interface RequestUpdateProps {
  closeModal: Function;
  user: ProfileInterface;
  setIsLoading: Function;
}

const currentUser = (): Promise<firebase.User | null> => {
  return new Promise(resolve => {
    return resolve(firebase.auth().currentUser);
  });
};

const updatePassword = (profile: any, newPassword: string): Promise<firebase.User> => {
  return new Promise(resolve => {
    return resolve(profile.updatePassword(newPassword));
  });
};

const updateProfile = (profile: any, name: string, photo: string): Promise<firebase.User> => {
  return new Promise(resolve => {
    profile.updateProfile({
      displayName: name,
      photoURL: photo,
    });

    return resolve(profile);
  });
};

/**
 * @param {object} payload
 * @param {object} payload.user
 * @param {Function} payload.closeModal
 * @returns {Generator <StrictEffect, void, any>}
 */
export default function* requestUpdate({
  payload: { user, closeModal, setIsLoading },
}: RequestProps<RequestUpdateProps>): Generator<StrictEffect, void, any> {
  try {
    const { file, uid, password, name }: ProfileInterface = user;
    const storageRef: firebase.storage.Reference = firebase.storage().ref();
    const child: string = 'avatars/';

    //* first we get the user
    const profile: firebase.User = yield call(currentUser);
    //* than we set photo to store and get url on store
    const photo: string = yield call(getDownloadURL, storageRef, file, child);

    //* after we change the pasword and update the profile
    yield call(updatePassword, profile, password);
    yield call(updateProfile, profile, name, photo);
    yield call(updateFirebaseUser, { uid, name, photo });

    yield closeModal();
    yield put({
      type: FETCH_USER_SET,
      payload: {
        user: {
          name,
          photo,
        },
      },
    });
    toast('Profile was change', TOASTIFY_CONFIG);
    setIsLoading(false);
  } catch (error) {
    handleError(error);
    setIsLoading(false);
    toast(error.message, TOASTIFY_CONFIG);
  }
}
