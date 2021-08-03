import firebase from "firebase";

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

export const handleError = (error: Error): never => {
  console.error(error);
  console.error(error.message);
  console.error(error.stack);
  throw new Error(`
        \nERROR: ${error}
        \nERROR_MESSAGE: ${error.message} 
        \nSTACK: ${error.stack}
    `);
};
