type image = string | null

interface MessageTemplateProps {
    content: string
    picture: string    
}

interface messageTemplate {
    writtenBy: string
    timestamp: string | any
    content  : string
    image    : image
}

export const messageTemplate = ({content, picture}: MessageTemplateProps): messageTemplate => {
    let timestamp: any       = new Date();
    let writtenBy: string    = 'operator';
    let image    : image     = picture ?? null;

    return {
        writtenBy,
        timestamp,
        content,
        image, 
    };
};