import {BlockType} from "./BlockState.ts";
import {TagData} from "./TagData.ts";

export interface BlockData {
    id: string;
    type: BlockType;
    tags: TagData[];
}