import {v4 as v4uuid} from "uuid";
export enum TagType {
    Text,
    Code,
    Math,
    Image,
    Bold,
    Italic
}

export enum BlockType {
    Text,
    Code,
    Math,
    Image,
}

export type TagData = {
    type: TagType;
    content: any;
}

export type BlockData = {
    type: BlockType;
    tags: TagData[]
}

export type PostData = {
    blocks: BlockData[]
}

export class PostItem {
    public blocks: BlockItem[];
    public id: string;

    constructor(data: PostData) {
        this.blocks = data.blocks.map(block => new BlockItem(block));
        this.id = v4uuid();
    }
}

export class BlockItem {
    public type: BlockType;
    public tags: TagItem[];
    public id: string;

    constructor(data: BlockData) {
        this.type = data.type;
        this.tags = data.tags.map(tag => new TagItem(tag));
        this.id = v4uuid();
    }
}

export class TagItem {
    public type: TagType;
    public content: string;
    public id: string;
    constructor(data: TagData) {
        this.type = data.type;
        this.content = data.content;
        this.id = v4uuid();
    }
}