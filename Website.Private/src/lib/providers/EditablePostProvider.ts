import {PostState} from "../../pages/editor/types/state/PostState.ts";
import {EditablePostDataPlaceholder} from "../placeholders/EditablePostDataPlaceholder.ts";
import {v4 as v4uuid} from "uuid";
import {BlockState} from "../../pages/editor/types/state/BlockState.ts";
import {TextEditorRole} from "../../pages/editor/types/state/TextEditorRole.ts";
import {TagState} from "../../pages/editor/types/state/TagState.ts";
import {PostData} from "../../pages/editor/types/data/PostData.ts";

export class EditablePostProvider {
    public static async get(postId: string): Promise<Partial<PostState>> {
        await new Promise(resolve => setTimeout(resolve, 1));

        const post = EditablePostDataPlaceholder;

        const blockStates = post.blocks.map(blockData => {
            const tagStates = blockData.tags.map(tag => ({
                role: TextEditorRole.Tag,
                id: v4uuid(),
                content: tag.content,
                type: tag.type,
                isInactive: false,
            })) satisfies TagState[];

            return {
                role: TextEditorRole.Block,
                id: blockData.id,
                type: blockData.type,
                tags: tagStates
            };

        }) satisfies BlockState[];

            return {
                id: post.id,
                title: post.title,
                blocks: blockStates
            } satisfies Partial<PostData>
        }
    }