import firebase from 'firebase';

interface FormFields {
    email   : string
    password: string
}

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
export const requestChatrooms = (): Promise <any> => {
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
export const requestDilaogs = (chatsRef: any): Promise <any> => {
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
export const requestFilter = (chatsRef: any, search: string): Promise <any> => {
    // console.log(search)
    return new Promise((resolve, reject) => {
        //* We create and return promise
        //* that allow creates assync request
        chatsRef
            .on('value', (snapshot: any): any => {
                //* In array dialogs 
                //* we are adding filtered dialogs 
                const dialogs: any = (
                    snapshot
                        .val()
                        .filter((child: any, index: number): void => {
                            //* We create filters to client and content
                            const client : string = child.client.toLocaleLowerCase().trim();
                            const content: string = child.messages[index].content.toLocaleLowerCase().trim();

                            if (client.includes(search) || content.includes(search)) {
                                return child;
                            }
                    })
                );

                return resolve(dialogs);
            });
    });
}

/**
 * signInAccount
 * @param {string} email 
 * @param {string} password 
 * @returns {any}    
 */
export const signInAccount = ({email, password}: FormFields): any => {
    return (
      firebase
        .auth()
        .signInWithEmailAndPassword(
          email, 
          password
        )
    );
};
    
/**
 * getIdToken
 * @returns {string}    
 */
export const getIdToken = (): any => {
    return (
      firebase
        .auth()
        .currentUser
        ?.getIdToken()
    );
};