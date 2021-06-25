interface Message {
    content   : string, 
    timestamp : number, 
    writtenBy : string
}

export interface Props {
    client: string
    messages: Message[]
    operatorId: number
    status: string
    chatId: string
    online: boolean
    timestamp: number
    complite: boolean
    score   : number
}