import {List} from "immutable";

export enum TagType {
    Text,
    Code,
    Bold,
    Italic,
    Underlined,
}

export interface TagData {
    type: TagType;
    content: any;
}

export enum BlockType {
    Text
}

export interface BlockData {
    type: BlockType;
    tags: List<TagData>
}

export interface PostData {
    blocks: List<BlockData>
}