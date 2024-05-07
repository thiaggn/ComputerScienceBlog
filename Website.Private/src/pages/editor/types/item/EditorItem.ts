export enum ItemRole {
    Block,
    Tag,
    Column
}

export interface EditorItem {
    role: ItemRole
}