import {create} from "zustand";
import {PostState} from "../pages/editor/types/state/PostState.ts";
import {BlockState} from "../pages/editor/types/state/BlockState.ts";
import {TagState} from "../pages/editor/types/state/TagState.ts";
import {CaretPosition} from "../pages/editor/types/CaretPosition.ts";


export const usePostStore = create<PostState>((set) => ({
    id: "",
    title: "",
    blocks: [],
    caretPosition: null,

    setCaretPosition: (caretPosition: CaretPosition) => set((state: PostState) => {
        return {caretPosition}
    }),

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

    removeTags: (targetBlockId: any, targetTagIds: any[]) => set((state: PostState) => {
        const newBlocks = state.blocks.map(block => {
            if(block.id != targetBlockId) return block;
            let removedCount = 0;

            const newTags: TagState[] = block.tags.filter(tag => {
                if(removedCount < targetTagIds.length) {

                    for(let i = removedCount; i < targetTagIds.length; i++) {
                        const removedId = targetTagIds[i];

                        if(removedId == tag.id) {
                            removedCount++;
                            return false;
                        }
                    }

                    return true;
                }

                return true;
            });

            return {
                ...block,
                tags: newTags
            };

        }) satisfies BlockState[];

        return {
            blocks: newBlocks
        } satisfies Partial<PostState>;
    }),

    insertTags: (targetBlockId: any, beforeTagId: string | null, tags: TagState[]) => set((state: PostState) => {

        const newBlocks = state.blocks.map(block => {
            if(block.id != targetBlockId) return block;
            let newTags: TagState[] = [];

            let prevTag: TagState | undefined;
            const processTag = (currTag: TagState) => {
                if(prevTag != undefined && prevTag.type == currTag.type) {
                    prevTag.content += currTag.content;
                }
                else {
                    newTags.push(currTag);
                }

                prevTag = currTag;
            }

            if(beforeTagId == null) {
                for(let currTag of tags) processTag(currTag);
                for(let currTag of block.tags) processTag(currTag);
            }

            else {
                newTags = [];

                for(let tag of block.tags) {
                    newTags.push(tag);

                    if (tag.id == beforeTagId)  {
                        newTags.push(...tags);
                    }
                }
            }

            return {
                ...block,
                tags: newTags
            }
        }) satisfies BlockState[];

        return {
            blocks: newBlocks
        } satisfies Partial<PostState>;
    })
}));