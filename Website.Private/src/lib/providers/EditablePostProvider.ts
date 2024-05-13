import {PostState} from "../../pages/editor/types/data/PostState.ts";
import {v4 as v4uuid} from "uuid";
import {BlockState, BlockType} from "../../pages/editor/types/data/BlockState.ts";
import {TagState} from "../../pages/editor/types/data/TagState.ts";
import {BlockData} from "../../pages/editor/types/data/BlockData.ts";
import {EditablePostDataPlaceholder} from "../placeholders/EditablePostDataPlaceholder.ts";

function parseTextBlock(block: BlockData<TagState>) {
    const blockId = v4uuid();

    let lastTagIndex = block.contents.length - 1;
    let currentIndex = 0;

    const tags = block.contents.map(tag => ({
        id: v4uuid(),
        content: (lastTagIndex != currentIndex++) ? tag.content : tag.content.trimEnd(),
        type: tag.type,
        parentBlockId: blockId
    })) satisfies TagState[];

    return {
        id: v4uuid(),
        type: block.type,
        contents: tags
    } satisfies BlockState<TagState>;
}

export class EditablePostProvider {
    public static async get(postId: string): Promise<Partial<PostState>> {
        await new Promise(resolve => setTimeout(resolve, 1));

        const post = EditablePostDataPlaceholder;

        const blockStates = post.blocks.map(blockData => {

            switch (blockData.type) {
                case BlockType.Text:
                    return parseTextBlock(blockData);

                case BlockType.Table:
                    throw new Error("Table block type parse is not implemented");

                case BlockType.Undefined:
                    throw new Error("Block type can't be undefined");
            }

        }) satisfies BlockState<unknown>[];

        return {
            id: v4uuid(),
            title: post.title,
            blocks: blockStates
        } satisfies PostState
    }
}