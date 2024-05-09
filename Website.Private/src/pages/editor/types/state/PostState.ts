import {BlockState} from "./BlockState.ts";
import {TagState} from "./TagState.ts";

export interface PostState {
    id: string;
    title: string;
    blocks: BlockState[];
    offset: number;

    setPost: (post: Partial<PostState>) => void;
    updateTag: (targetBlockId: any, newTag: TagState) => void;
    removeTag: (targetBlockId: any, targetTagId: any) => void;
    insertTag: (targetBlockId: any, beforeTagId: any) => void;
    setOffset: (value: number) => void;
}
