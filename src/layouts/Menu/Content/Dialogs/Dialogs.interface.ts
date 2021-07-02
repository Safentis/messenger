export interface Props {
    children?   : any
    dialogs     : any[]
    status      : string
    uid         : string
    loader      : any 
    hasMoreItems: boolean
    loadMore    : () => void 
    showItems   : (dialogs: any[]) => any
}