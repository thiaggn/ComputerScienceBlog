import {TagData} from "../data/TagData.ts";

export enum EventAction {
    ReplaceAndDeleteBlocks ,
}
export interface EditorEvent {
    action: EventAction;
}

export interface ReplaceAndDeleteBlocksEditorEvent extends EditorEvent {
    action: EventAction.ReplaceAndDeleteBlocks;
    deletedBlockIds: string[]
    alteredBlocks: {
        id: string,
        alteredTags: {
            id: string,
            value: string
        }
    }
}