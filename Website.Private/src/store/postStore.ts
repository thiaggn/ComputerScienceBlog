import {create} from "zustand";
import {PostState} from "../pages/editor/types/texteditor/PostState.ts";
import {BlockState} from "../pages/editor/types/texteditor/BlockState.ts";
import {TagState} from "../pages/editor/types/texteditor/TagState.ts";
import {SnapshotManager} from "../pages/editor/SnapshotManager.ts";
import {PostSnapshot} from "../pages/editor/types/PostSnapshot.ts";
import {SelectionObserver} from "../pages/editor/SelectionObserver.ts";
export const usePostStore = create<PostState>((set) => ({
    id: "",
    title: "",
    blocks: [],

    setPost: (post: Partial<PostState>) => set((state: PostState) => {

        if(post.blocks != null) {
            SnapshotManager.setSnapshot(post.blocks);
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

        SnapshotManager.captureSnapshot(newBlocks);

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

        return {
            blocks: newBlocks
        };
    }),

    insertTags: (targetBlockId: any, beforeTagId: string | null, tags: TagState[]) => set((state: PostState) => {
        return {};
    }),
}));