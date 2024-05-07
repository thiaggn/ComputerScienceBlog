import {TagItem} from "../../../types/item/TagItem.ts";
import {BlockItem} from "../../../types/item/BlockItem.ts";

export enum EditorEventAction {
    Insert,
    Update,
    Remove
}
export interface EditorEventData {
    block: BlockItem,
    action: EditorEventAction
}
