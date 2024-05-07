export enum UpdateAction {
    Insert,
    Update,
    Delete
}
export interface EditorEventData {
    action: UpdateAction
}

interface EditorUpdateEventData extends EditorEventData {

}

interface EditorInsertEventData extends EditorEventData {

}