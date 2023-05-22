export interface IModalData {
    title:string,
    videoUrl?:string,
    description?:string,
    buttons?:IModalButton[]
}

export interface IModalButton {
    url:string,
    text:string,
    target?:string
}