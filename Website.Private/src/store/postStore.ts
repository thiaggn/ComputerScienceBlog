import {create} from "zustand";
import {PostState} from "../pages/editor/types/state/PostState.ts";
import {BlockState} from "../pages/editor/types/state/BlockState.ts";
import {ContentState} from "../pages/editor/types/state/ContentState.ts";
import {EditorSnapshotService} from "../pages/editor/EditorSnapshotService.ts";
import {SnapshotRecord} from "../pages/editor/types/SnapshotRecord.ts";

type PostStore = PostState & {
    initializePost: (post: Partial<PostState>) => void;
    goToSnapshot: (snapshot: SnapshotRecord) => void;
}

export class PostStoreAction {
    public static findSucessorBlock(targetBlock: BlockState): BlockState | null {
        const state = usePostStore.getState();

        for(let i = 0; i < state.blocks.length; i++) {
            if(state.blocks[i] == targetBlock) {
                return state.blocks[i + 1] || null;
            }
        }

        return null;
    }

    public static findSucessorTag(targetBlock: BlockState, targetTag: ContentState) {
        const state = usePostStore.getState();

        for(let i = 0; i < state.blocks.length; i++) {
            if(state.blocks[i].id == targetBlock.id) {
                for(let j = 0; j < state.blocks[i].contents.length; j++) {
                    if(state.blocks[i].contents[j] == targetTag) {
                        return state.blocks[i].contents[j + 1] || null;
                    }
                }

                break;
            }
        }

        return null;
    }
}
export class PostStoreMutation {

    private state: PostStore = usePostStore.getState();
    private hasFinished: boolean = false;

    public finish() {
        if(!this.hasFinished) {
            EditorSnapshotService.captureSnapshot(this.state.blocks);
            usePostStore.setState(this.state);
        }

        this.hasFinished = true;
    }
    public removeBlocks(removedBlocks: BlockState[]) {


        return this;
    }

    public removeTextTags(targetBlockId: string, removedTags: ContentState[]) {

        return this;
    }

    public updateTextTags(targetBlockId: string, updatedTags: ContentState[]) {
        return this;
    }

    public joinTextBlocks(firstBlockId: string, secondBlockId: string) {


        return this;
    }

    public splitTextBlock(targetBlock: string, targetTag: string, offset: number) {

        return this;
    }

    public splitTextTag() {

        return this;
    }
}


export const usePostStore = create<PostStore>((set) => ({
    id: "",
    title: "",
    blocks: [],

    initializePost: (post: Partial<PostState>) => set((state) => {
        EditorSnapshotService.setInitialSnapshot(post.blocks || []);

        return {
            ...post,
        } as Partial<PostState>;
    }),

    goToSnapshot: (snapshot: SnapshotRecord) => set((state: PostState) => {
        return {
            ...state,
            blocks: snapshot.blocks
        }
    }),
}));