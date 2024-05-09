import {BlockType} from "../state/BlockState.ts";
import {TagData} from "./TagData.ts";

export interface BlockData {
    id: string;
    type: BlockType;
    tags: TagData[];
}