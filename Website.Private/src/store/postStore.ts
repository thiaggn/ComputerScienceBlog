import {create} from "zustand";
import {PostState} from "../pages/editor/types/texteditor/PostState.ts";
import {BlockState} from "../pages/editor/types/texteditor/BlockState.ts";
import {TagState} from "../pages/editor/types/texteditor/TagState.ts";
import {SnapshotService} from "../pages/editor/SnapshotService.ts";
import {PostSnapshot} from "../pages/editor/types/PostSnapshot.ts";
export const usePostStore = create<PostState>((set) => ({
    id: "",
    title: "",
    blocks: [],

    setPost: (post: Partial<PostState>) => set((state: PostState) => {

        if(post.blocks != null) {
            SnapshotService.setSnapshot(post.blocks);
        }

        return {
            ...post,
        } as Partial<PostState>;
    }),

    goToSnapshot: (snapshot: PostSnapshot) => set((state: PostState) => {
        return {
            ...state,
            blocks: snapshot.blocks
        }
    }),

    updateTag: (targetBlockId: any, newTag: TagState) => set((state: PostState) => {

        const newBlocks = state.blocks.map(block => {
            if (block.id !== targetBlockId) return block;

            const newTags = block.tags.map(tag => {
                if (tag.id != newTag.id) return tag;
                else return newTag;
            }) satisfies TagState[];

            return {
                ...block,
                tags: newTags,
            }
        }) satisfies BlockState[];

        SnapshotService.captureSnapshot(newBlocks);

        return {
            blocks: newBlocks
        } satisfies Partial<PostState>;
    }),

    removeTags: (targetBlockId: any, targetTagIds: any[]) => set((state: PostState) => {
        const newBlocks = state.blocks.map(block => {
           if(block.id != targetBlockId) return block;
           const newTags: TagState[] = block.tags.filter(tag => !targetTagIds.includes(tag.id));

           return {
               ...block,
               tags: newTags
           }
        });

        SnapshotService.captureSnapshot(newBlocks);

        return {
            blocks: newBlocks
        };
    }),

    removeBlocks: (blockIds: any[]) => set((state: PostState) => {
       return {
           blocks: state.blocks.filter(block => !blockIds.includes(block.id))
       }
    }),

    insertTags: (targetBlockId: any, beforeTagId: string | null, tags: TagState[]) => set((state: PostState) => {
        return {};
    }),
}));