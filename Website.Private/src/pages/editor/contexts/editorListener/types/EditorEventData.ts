import {TagItem} from "../../../types/item/TagItem.ts";
import {BlockItem} from "../../../types/item/BlockItem.ts";
import {CaretMoveCommand} from "../CaretMoveCommand.ts";

export enum EditorEventAction {
    Insert,
    Update,
    Remove
}
export interface EditorEventData {
    block: BlockItem,
    action: EditorEventAction
}
