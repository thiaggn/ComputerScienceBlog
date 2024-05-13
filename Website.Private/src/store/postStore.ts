import {create} from "zustand";
import {PostState} from "../pages/editor/types/data/PostState.ts";
import {BlockState} from "../pages/editor/types/data/BlockState.ts";
import {TagState} from "../pages/editor/types/data/TagState.ts";
import {EditorSnapshotService} from "../pages/editor/hooks/EditorSnapshotService.ts";
import {PostSnapshot} from "../pages/editor/types/PostSnapshot.ts";
import {exclusiveMap} from "../utils/exclusiveMap.ts";
import {TagData} from "../pages/editor/types/data/TagData.ts";


type PostStore = PostState & {
    setPost: (post: Partial<PostState>) => void;
    updateTextTagsInBlock: (targetBlockId: string, updatedTags: TagState[]) => void;
    removeTextBlockTags: (targetBlockId: any, targetTagIds: any[]) => void;
    removeBlocks: (blockIds: BlockState<unknown>[]) => void;
    goToSnapshot: (snapshot: PostSnapshot) => void;
    joinBlocks: (firstBlockId: string, secondBlockId: string) => void;
}

export const usePostStore = create<PostStore>((set) => ({
    id: "",
    title: "",
    blocks: [],

    setPost: (post: Partial<PostState>) => set((state: PostState) => {
        if (post.blocks != null) {
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


    joinBlocks: (firstBlockId: string, secondBlockId: string) => set((state) => {
        let firstBlock: BlockState<any> | undefined;
        let secondBlock: BlockState<any> | undefined;

        const newBlocks = exclusiveMap(state.blocks, (block, i) => {
           if(block.id == secondBlockId) {
               secondBlock = block;
               return;
           }

           if(block.id == firstBlockId) firstBlock = {...block};
           return block;
        })

        if(firstBlock && secondBlock) {
            firstBlock.contents.push(...secondBlock.contents);
        }

        return {
            ...state,
            blocks: newBlocks
        }
    }),

    updateTextTagsInBlock: (targetBlockId: string, updatedTags: TagState[]) => set((state: PostState) => {
        const newBlocks = (state.blocks as BlockState<any>[]).map((block) => {
            if (block.id !== targetBlockId) return block;
            const newTags: TagState[] = [];

            for(let j = 0, i = 0; j <= updatedTags.length && i < block.contents.length; i++) {

                if(j == updatedTags.length) {
                    newTags.push(...block.contents.slice(i));
                    break;
                }

                const updatedTag = updatedTags[j];
                const oldTag = block.contents[i];

                if(updatedTag.id == oldTag.id) {
                    if(updatedTag.content.length > 0) newTags.push(updatedTag);
                    j++;
                }

                else newTags.push(oldTag);
            }


            return {
                ...block,
                contents: newTags
            } as BlockState<TagState>

        }) satisfies BlockState<unknown>[];

        EditorSnapshotService.captureSnapshot(newBlocks);

        return {
            blocks: newBlocks
        } satisfies Partial<PostState>;
    }),

    removeTextBlockTags: (targetBlockId: any, targetTagIds: any[]) => set((state: PostState) => {
        const newBlocks = state.blocks.map(block => {
            if (block.id != targetBlockId) return block;
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
        const newBlocks = state.blocks.filter(oldBlock => !removedBlocks.includes(oldBlock));
        console.log(newBlocks);

        return {
            blocks: newBlocks
        }
    }),

    insertTags: (targetBlockId: any, beforeTagId: string | null, tags: TagState[]) => set((state: PostState) => {
        return {};
    }),
}));