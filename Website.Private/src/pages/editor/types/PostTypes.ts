import {BlockData, BlockItem, BlockType} from "./BlockTypes.ts";
import {List} from "immutable";
import {TagItem} from "./TagTypes.ts";


export interface PostData {
    id: string;
    title: string;
    blocks: BlockData[];
}

export class EditablePostItem {
    id: string;
    title: string;
    blocks: List<BlockItem>

    private constructor(id: string, title: string, blocks: List<BlockItem>) {
        this.title = title;
        this.blocks = blocks;
        this.id = id;
    }

    public static create(data: PostData) {

        const blockItems = List<BlockItem>(data.blocks.map(
            (blockData: BlockData) => BlockItem.create(blockData))
        );

        return new EditablePostItem(data.id, data.title, blockItems);
    }

    public updateBlocks(updatedBlocks: BlockItem | BlockItem[]) {
        if (!Array.isArray(updatedBlocks)) updatedBlocks = [updatedBlocks];

        let newBlocks = this.blocks.withMutations((mutableBlocks) => {
            for (let updatedBlock of updatedBlocks) {
                let counter = 0;

                for (let block of mutableBlocks) {
                    if (block.id == updatedBlock.id) mutableBlocks.set(counter, updatedBlock);
                    counter++;
                }
            }
        })

        return {...this, blocks: newBlocks};
    }

    public removeBlocks(idsToRemove: string | string[]) {
        if (!Array.isArray(idsToRemove)) idsToRemove = [idsToRemove];

        let newBlocks = this.blocks.withMutations(mutableBlocks => {
            mutableBlocks.filter((block) => idsToRemove.includes(block.id))
        });

        return {...this, blocks: newBlocks};
    }

    public insertBlocks(start: number, blocks: BlockItem[] | BlockItem) {
        let newBlocks: List<BlockItem>;

        if (Array.isArray(blocks)) newBlocks = this.blocks.splice(start, 0, ...blocks);
        else newBlocks = this.blocks.splice(start, 0, blocks);

        return {...this, blocks: newBlocks};
    }
}
