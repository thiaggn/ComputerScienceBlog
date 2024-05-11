import {BlockState} from "./BlockState.ts";
import {TagState} from "./TagState.ts";
import {CaretPositionRecord} from "../CaretPositionRecord.ts";
import {PostSnapshot} from "../PostSnapshot.ts";

export interface PostState {
    id: string;
    title: string;
    blocks: BlockState[];

    setPost: (post: Partial<PostState>) => void;
    updateTag: (targetBlockId: any, newTag: TagState) => void;
    removeTags: (targetBlockId: any, targetTagIds: any[]) => void;
    goToSnapshot: (snapshot: PostSnapshot) => void;
}
