import {BlockState} from "./BlockState.ts";
import {TagState} from "./TagState.ts";
import {CaretPosition} from "../CaretPosition.ts";

export interface PostState {
    id: string;
    title: string;
    blocks: BlockState[];
    caretPosition: CaretPosition | null,

    setPost: (post: Partial<PostState>) => void;
    updateTag: (targetBlockId: any, newTag: TagState) => void;
    removeTags: (targetBlockId: any, targetTagIds: any[]) => void;
    insertTags: (targetBlockId: any, beforeTagId: string | null, tags: TagState[]) => void;
    setCaretPosition: (caretPosition: CaretPosition) => void;
}
