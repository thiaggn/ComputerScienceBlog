import {BlockType} from "../state/BlockState.ts";
import {TagData} from "./TagData.ts";

export interface BlockData<T = any> {
    type: BlockType;
    contents: T[]
}