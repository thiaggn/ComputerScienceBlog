
export enum BlockType {
    Undefined,
    Text,
    Table
}
export interface BlockState<T> {
    type: BlockType;
    id: string;
    contents: T[]
}


