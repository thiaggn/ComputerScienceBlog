import {create} from "zustand";
import {PostState} from "../pages/editor/types/editor_elements/state/PostState.ts";
import {BlockState, BlockType} from "../pages/editor/types/editor_elements/state/BlockState.ts";
import {TagState} from "../pages/editor/types/editor_elements/state/TagState.ts";
import {EditorSnapshotService} from "../pages/editor/EditorSnapshotService.ts";
import {PostSnapshot} from "../pages/editor/types/PostSnapshot.ts";


type PostStore = PostState & {
    setPost: (post: Partial<PostState>) => void;
    updateTextBlockTags: (targetBlockId: any, newTag: TagState) => void;
    removeTextBlockTags: (targetBlockId: any, targetTagIds: any[]) => void;
    removeBlocks: (blockIds: any[]) => void;
    goToSnapshot: (snapshot: PostSnapshot) => void;
}

export const usePostStore = create<PostStore>((set) => ({
    id: "",
    title: "",
    blocks: [],

    setPost: (post: Partial<PostState>) => set((state: PostState) => {
        if(post.blocks != null) {
            EditorSnapshotService.setSnapshot(post.blocks);
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

    updateTextBlockTags: (targetBlockId: string, newTag: TagState) => set((state: PostState) => {
        const newBlocks = state.blocks.map((block: BlockState<unknown>) => {
            if (block.id !== targetBlockId) return block;

            const newTags = (block as BlockState<TagState>).contents.map(tag => {
                if (tag.id != newTag.id) return tag;
                else return newTag;
            }) satisfies TagState[];

            return {
                ...block,
                contents: newTags,
            } as BlockState<TagState>

        }) satisfies BlockState<unknown>[];

        EditorSnapshotService.captureSnapshot(newBlocks);

        return {
            blocks: newBlocks
        } satisfies Partial<PostState>;
    }),

    removeTextBlockTags: (targetBlockId: any, targetTagIds: any[]) => set((state: PostState) => {
        const newBlocks = state.blocks.map(block => {
           if(block.id != targetBlockId) return block;
           const newTags: TagState[] = (block as BlockState<TagState>)
               .contents
               .filter(tag => !targetTagIds.includes(tag.id));

           return {
               ...block,
               tags: newTags
           }
        });

        EditorSnapshotService.captureSnapshot(newBlocks);

        return {
            blocks: newBlocks
        };
    }),

    removeBlocks: (removedBlocks: BlockState<unknown>[]) => set((state: PostState) => {
       return {
           blocks: state.blocks.filter(oldBlocks => !removedBlocks.includes(oldBlocks))
       }
    }),

    insertTags: (targetBlockId: any, beforeTagId: string | null, tags: TagState[]) => set((state: PostState) => {
        return {};
    }),
}));