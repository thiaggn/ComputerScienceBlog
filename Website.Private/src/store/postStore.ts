import {create} from "zustand";
import {PostState} from "../pages/editor/types/state/PostState.ts";
import {BlockState} from "../pages/editor/types/state/BlockState.ts";
import {TagState} from "../pages/editor/types/state/TagState.ts";

export const usePostStore = create<PostState>((set) => ({
    id: "",
    title: "",
    blocks: [],

    setPost: (post: Partial<PostState>) => set((state: PostState) => {
       return post;
    }),

    updateTag: (targetBlockId: any, newTag: TagState) => set((state: PostState) => {
        const newBlocks = state.blocks.map(block => {
           if(block.id !== targetBlockId) return block;

           const newTags = block.tags.map(tag => {
               if(tag.id != newTag.id) return tag;
               else return newTag;
           }) satisfies TagState[];

            return {
                ...block,
               tags: newTags,
            }
        }) satisfies BlockState[] ;

        return {
            blocks: newBlocks
        } satisfies Partial<PostState>;
    }),

    removeTag: (targetBlockId: any, targetTagId: any) => set((state: PostState) => {
        const newBlocks = state.blocks.map(block => {
            if(block.id != targetBlockId) return block;

            const newTags: TagState[] = block.tags.filter(tag => tag.id != targetTagId);

            return {
                ...block,
                tags: newTags
            };

        }) satisfies BlockState[];

        return {
            blocks: newBlocks
        } satisfies Partial<PostState>;
    }),

    insertTag: (targetBlockId: any, beforeTagId: any) => set((state: PostState) => {
        return {

        };
    })
}));