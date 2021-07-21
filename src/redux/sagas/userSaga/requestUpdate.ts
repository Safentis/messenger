import firebase                    from 'firebase';
import { call, put, StrictEffect } from 'redux-saga/effects';
import { FETCH_USER_SET          } from '../../actions/user';
import { getDownloadURL          } from '../../../utils/functions';

const currentUser = () => {
    return new Promise((resolve) => {
        return resolve(firebase.auth().currentUser);
    });
};

const updatePassword = (profile: any, newPassword: string): Promise<any> => {
    return new Promise((resolve) => {
        return resolve(profile.updatePassword(newPassword));
    })
}

const updateProfile = (profile: any, name: string, photo: string) => {
    return new Promise((resolve) => {
        profile.updateProfile({
            displayName: name,
            photoURL: photo
        });

        return resolve(profile);
    })
}

/**
 * @param {object} payload 
 * @param {object} payload.user
 * @returns {Generator <StrictEffect, any, any>}
 */
export default function* requestUpdate({payload: { user, closeModal }}: any): Generator<
    StrictEffect,
    any,
    any
> {
    try {
        const { file, uid, password, name } = user;
        const storageRef = firebase.storage().ref();
        const child: string = 'avatars/';
        
        //* first we get the user
        const profile = yield call(currentUser);
        //* than we set photo to store and get url on store
        const photo   = yield call(getDownloadURL, storageRef, file, child);
        
        //* after we change the pasword and update the profile
        yield call(updatePassword, profile, password);
        yield call(updateProfile, profile, name, photo);

        yield closeModal();
        yield put({
            type: FETCH_USER_SET,
            payload: {
                user: { name, photo },
            },
        });
    } catch(err) {
        console.error('Code ', err.code)
        console.error('Message ', err.message);
    }
}