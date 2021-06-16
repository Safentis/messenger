/** 
 * reqValidationToken is the method which make request to a server
 * and checks token 
 * @param {string} token
 */
export async function reqValidationToken(token: string) {
    try {
        return await fetch('https://messenger-token-checker.herokuapp.com/', {
            method : 'POST',
            headers: {
                'Content-Type'  : 'application/json',
                'x-access-token': token,
            }
        });
    } catch (error) {
        return await error;
    }
}