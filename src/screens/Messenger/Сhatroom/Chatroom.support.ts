import firebase from 'firebase';
import { getDownloadURL } from '../../../utils/functions';

type image = string[] | null

interface MessageTemplateProps {
    content: string
    pictures: string[] | null  
}

interface messageTemplate {
    writtenBy: string
    timestamp: string | any
    content  : string
    images   : image
}

export const messageTemplate = ({content, pictures}: MessageTemplateProps): messageTemplate => {
    let timestamp: any       = new Date();
    let writtenBy: string    = 'operator';
    let images   : image     = pictures;

    return {
        writtenBy,
        timestamp,
        content,
        images, 
    };
};


//* ---------------------------------------------------------------
//* Functions for saving of the images in the store and getting url
interface MessageImageSaveProps {
    pictures: any[];
}

export const messageImageSave = async ({pictures}: MessageImageSaveProps) => {
    let storageRef = firebase.storage().ref();
    let child: string = 'images/';
    let urls: string[] = [];

    try {
        
        for await (let picture of pictures) {
            //* We get one url 
            let url: any = await getDownloadURL(storageRef, picture, child);
    
            urls.push(url);
        }

        return urls;

    } catch(error) {
        throw new Error(`${error}`);
    }
}