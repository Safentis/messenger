export interface Props {
    chatId  : string
    messages: any[]
    handleSendMessage: (value: string, chatId: string) => void
}