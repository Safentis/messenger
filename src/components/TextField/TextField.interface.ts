export interface Props {
    chatId      : string
    value       : string
    handleChange: () => void
    handleSendMessage: (value: string, chatId: string) => void
}

export interface Controls {
    smiles : any,
    enclose: any,
    send   : any
}