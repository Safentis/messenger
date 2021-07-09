import { useState, useEffect } from 'react';
import firebase                from 'firebase';

const standartAvatar = (Component: any) => (props: any) => {
    const [defaultAvatar, setDefaultAvatar] = useState('');

    useEffect(() => {
        const storeRef = firebase.storage();
        const getUrl = storeRef
            .ref('avatars/anonymous-user.png')
            .getDownloadURL();
            
        getUrl
            .then((src: string) => {
                console.log(src);
                setDefaultAvatar(src)
            })
            .catch((err: object) => {
                console.error(`
                    Default avatar error:
                    ${err} 
                `);
            });
    }, []);
    
    return (
        <Component url={defaultAvatar} {...props}/>    
    );
};

export default standartAvatar;