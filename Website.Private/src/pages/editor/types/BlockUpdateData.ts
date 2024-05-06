import {BlockItem, BlockType, TagData, TagItem} from "./EditorTypes.ts";

export enum BlockUpdateAction {
    Set,
    Remove
}

export interface BlockUpdateData {
    action: BlockUpdateAction;
    block?: BlockItem;
}