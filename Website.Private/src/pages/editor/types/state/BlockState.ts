import {TagState} from "./TagState.ts";
import {TextEditorRole} from "./TextEditorRole.ts";

export enum BlockType {
    Text
}
export interface BlockState {
    role: TextEditorRole.Block;
    id: string;
    type: BlockType;
    tags: TagState[]
}