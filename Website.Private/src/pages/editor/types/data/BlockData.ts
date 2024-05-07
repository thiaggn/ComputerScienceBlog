import {BlockType} from "../item/BlockItem.ts";
import {TagData} from "./TagData.ts";

export interface BlockData {
    id?: string;
    type: BlockType;
    tags: TagData[];
}