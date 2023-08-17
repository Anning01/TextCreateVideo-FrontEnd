export type TScetion = {
    id: number,
    name: string,
    paragraph: string,
    prompt: string,
    negative: string,
}

export type TTags = {
    id: number,
    name: string,
    content: string,
    prompt: string,
    negative: string,
}
export type MenuDataType = {
    txt: string
    current: boolean
    type: string
}