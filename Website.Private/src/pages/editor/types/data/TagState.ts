export enum TagType {
    Text,
    Code,
    Bold,
    Italic,
}
export interface TagState {
    id: string;
    type: TagType;
    content: string;
    parentBlockId: string
}