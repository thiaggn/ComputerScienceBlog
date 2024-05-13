import {PostState} from "../../pages/editor/types/editor_elements/state/PostState.ts";
import {EditablePostDataPlaceholder} from "../placeholders/EditablePostDataPlaceholder.ts";
import {v4 as v4uuid} from "uuid";
import {BlockState, BlockType} from "../../pages/editor/types/editor_elements/state/BlockState.ts";
import {TextEditorRole} from "../../pages/editor/types/TextEditorRole.ts";
import {TagState} from "../../pages/editor/types/editor_elements/state/TagState.ts";
import {BlockData} from "../../pages/editor/types/editor_elements/data/BlockData.ts";

function parseTextBlock(block: BlockData<TagState>) {
    const blockId = v4uuid();

    const tags = block.contents.map(tag => ({
        role: TextEditorRole.Tag,
        id: v4uuid(),
        content: tag.content,
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
                    return parseTextBlock(blockData);

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