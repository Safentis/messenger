import firebase from "firebase";

/**
 * reqValidationToken is
 * server request function 
 * to validate user token
 * @param {string} token secret key for user
 * @returns {object} res that contains var res.validation   
 */
export function reqValidationToken(token: string): object {
    return fetch('https://messenger-token-checker.herokuapp.com/', {
      method : 'POST',
      headers: {
          'Content-Type'  : 'application/json',
          'x-access-token': token,
      }
    })
      .then((res) => res.json());
}

/**
 * requestChatrooms
 * @returns {object} chatsRef
 */
export const requestChatrooms = (): any => {
    return new Promise((resolve, reject) => {
        const chatsRef: any = (
            firebase
                .database()
                .ref('chatrooms')
        );
        return resolve(chatsRef);
    });
};

/**
 * requestDilaogs
 * @param {any} chatsRef
 * @returns {object} dataSnapshot.val()
 */
export const requestDilaogs = (chatsRef: any): any => {
    return new Promise((resolve, reject) => {
        chatsRef
            .on('value', (dataSnapshot: any) => {
                return resolve(dataSnapshot.val());
        });
    });
}

/**
 * requestFilter
 * @param {any} chatsRef
 * @param {string} text
 * @returns {object} dialogs
 */
export const requestFilter = (chatsRef: any, text: string): any => {
    return new Promise((resolve, reject) => {
        //* We create and return promise
        //* that allow creates assync request
        chatsRef
            .on('value', (snapshot: any): any => {
                //* In array dialogs 
                //* we are adding filtered dialogs 
                const dialogs: any = [];

                snapshot
                    .val()
                    .forEach((child: any, index: number): void => {
                        //* We create filters to client and content
                        const client : string = child.client.toLocaleLowerCase().trim();
                        const content: string = child.messages[index].content.toLocaleLowerCase().trim();
                        const search : string = text.toLocaleLowerCase().trim();

                        if (client.includes(search) || content.includes(search)) {
                            dialogs.push(child);
                        }
                });

                return resolve(dialogs);
            });
    });
}