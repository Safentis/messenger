export interface Props {
    dialogs: any[]
    user   : any
}

export interface Message {
    content  : string
    writtenBy: string
    timestamp: string | number
    images  ?: string[]
}