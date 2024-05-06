import {v4 as v4uuid} from "uuid";
import {Map} from "immutable";

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
    public blocks: Map<string, BlockItem>;
    public id: string;

    constructor(data: PostData) {
        this.id = v4uuid();
        this.blocks = Map<string, BlockItem>().withMutations((map: Map<string, BlockItem>) => {
            for (let block of data.blocks) {
                const blockItem = new BlockItem(block);
                map.set(blockItem.id, blockItem);
            }
        });
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