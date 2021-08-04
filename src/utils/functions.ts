import firebase from "firebase";

import { STANDART_AVATAR } from "./consts";

export const getDownloadURL = (
  storageRef: any,
  picture: any,
  child: string
) => {
  return new Promise((resolve) => {
    let uploadTask = storageRef.child(child + picture.name).put(picture);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: any) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running");
            break;
        }
      },
      (error: any) => {
        switch (error.code) {
          case "storage/unauthorized":
            throw new Error(
              `User doesn't have permission to access the object`
            );
            break;
          case "storage/canceled":
            throw new Error(`User canceled the upload`);
            break;
          case "storage/unknown":
            throw new Error(
              `Unknown error occurred, inspect error.serverResponse`
            );
            break;
        }
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

export const handleError = (error: Error): never | void => {
  console.error(error);
  console.error(error.message);
  console.error(error.stack);
  // throw new Error(`
  //       \nERROR: ${error}
  //       \nERROR_MESSAGE: ${error.message} 
  //       \nSTACK: ${error.stack}
  //   `);
};

export const createFirebaseUser = async (user: firebase.User): Promise<void> => {
  await fetch(
    `https://messenger-b15ea-default-rtdb.europe-west1.firebasedatabase.app/users/${user.uid}.json`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.displayName || user.email,
        email: user.email,
        photo: user.photoURL || STANDART_AVATAR,
      }),
    }
  );
};
