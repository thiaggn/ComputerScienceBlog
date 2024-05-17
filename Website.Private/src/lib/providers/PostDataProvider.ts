import {PostState} from "../../pages/editor/types/state/PostState.ts";
import {postDataPlaceholder} from "../placeholders/PostDataPlaceholder.ts";
import {BlockState, BlockType} from "../../pages/editor/types/state/BlockState.ts";
import {v4 as v4uuid} from "uuid";
import {TagType} from "../../pages/editor/types/state/TagState.ts";
import {CodeTagState} from "../../pages/editor/types/state/tag/CodeTagState.ts";
import {LinkTagState} from "../../pages/editor/types/state/tag/LinkTagState.ts";
import {TextTagState} from "../../pages/editor/types/state/tag/TextTagState.ts";
import {TextBlockState} from "../../pages/editor/types/state/block/TextBlockState.ts";

export class PostDataProvider {
    public static async get(postId: string): Promise<PostState> {
        const blockStates: BlockState[] = postDataPlaceholder.map((blockData) => {

            const blockId = v4uuid().slice(0, 8);

            switch (blockData.type) {
                case BlockType.Text: {
                    let contentState = (blockData as unknown as TextBlockState)
                    .contents.map((tag) => {

                        const tagId = `${blockId}-${v4uuid().slice(0, 8)}`;

                        switch (tag.type) {
                            case TagType.Code: {
                                const {content, color, background} = tag as CodeTagState;
                                return new CodeTagState(tagId, content, color, background);
                            }

                            case TagType.Link: {
                                const {content, color, background, url} = tag as  LinkTagState;
                                return new LinkTagState(tagId, content, url, color, background);
                            }

                            case TagType.Text: {
                                const {content, color, styles} = tag as TextTagState;
                                return new TextTagState(tagId, content, styles, color);
                            }
                        }
                    })

                    return new TextBlockState(blockId, contentState);
                }

                default:
                    throw new Error();
            }
        })


        return {
            blocks: blockStates
        }
    }
}