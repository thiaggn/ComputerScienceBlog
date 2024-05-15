import {PostState} from "../../pages/editor/types/state/PostState.ts";
import {postDataPlaceholder} from "../placeholders/PostDataPlaceholder.ts";
import {BlockState} from "../../pages/editor/types/state/BlockState.ts";
import {v4 as v4uuid} from "uuid";
import {ContentState} from "../../pages/editor/types/state/ContentState.ts";

export class PostDataProvider {
    public static async get(postId: string): Promise<Partial<PostState>> {
        const postBlocks = postDataPlaceholder;
        const blockStates: BlockState[] = [];

        for (let blockData of postBlocks) {
            const blockId = v4uuid();

            const contents: ContentState[] = blockData.contents.map(content => {
                return {
                    ...content,
                    id: v4uuid(),
                    parentId: blockId
                } satisfies ContentState;
            })

            blockStates.push({
                ...blockData,
                contents: contents,
                id: blockId
            } satisfies BlockState);
        }

        return {
            blocks: blockStates
        }
    }
}