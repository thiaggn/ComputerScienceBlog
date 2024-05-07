import {TagItem} from "./TagItem.ts";
import {List} from "immutable";
import {EditorItem, ItemRole} from "./EditorItem.ts";
import {v4 as v4uuid} from "uuid";
import {BlockData} from "../data/BlockData.ts";
import {TagData} from "../data/TagData.ts";

export enum BlockType {
    Text
}

export class BlockItem implements EditorItem {
    public readonly role = ItemRole.Block;
    public readonly id: string;
    public readonly type: BlockType;
    public readonly tags: List<TagItem>;

    private constructor(id: string, type: BlockType, tags: List<TagItem>) {
        this.id = id;
        this.type = type;
        this.tags = tags;
    }

    public static create(data: BlockData) {
        const tagItems = List<TagItem>(data.tags.map(
            (data: TagData) => TagItem.create(data))
        );

        return new BlockItem(data.id || v4uuid(), data.type, tagItems);
    }


    public updateTags(updatedTags: TagItem | TagItem[]) {
        if (!Array.isArray(updatedTags)) updatedTags = [updatedTags];

        let newTags = this.tags.withMutations((mutableTags) => {
            for (let updatedBlock of updatedTags) {
                let counter = 0;

                for (let block of mutableTags) {
                    if (block.id == updatedBlock.id) mutableTags.set(counter, updatedBlock);
                    counter++;
                }
            }
        })

        return new BlockItem(this.id, this.type, newTags);
    }

    public removeTags(idsToRemove: string | string[]) {
        if (!Array.isArray(idsToRemove)) idsToRemove = [idsToRemove];

        let newTags = this.tags.withMutations(mutableTags => {
            mutableTags.filter((block) => idsToRemove.includes(block.id))
        });

        return new BlockItem(this.id, this.type, newTags);
    }

    public insertTags(start: number, blocks: TagItem[] | TagItem) {
        let newTags: List<TagItem>;

        if (Array.isArray(blocks)) newTags = this.tags.splice(start, 0, ...blocks);
        else newTags = this.tags.splice(start, 0, blocks);

        return new BlockItem(this.id, this.type, newTags);
    }
}

export const editableDivConfig = {
    contentEditable: true,
    suppressContentEditableWarning: true
}