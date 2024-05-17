import {create} from "zustand";
import {PostState} from "./types/state/PostState.ts";
import {BlockState} from "./types/state/BlockState.ts";
import {TagState} from "./types/state/TagState.ts";
import {TextBlockState} from "./types/state/block/TextBlockState.ts";
import {ContentState} from "./types/state/ContentState.ts";

interface PostStoreState extends PostState {
    setBlocks(blocks: BlockState[]): void;
    updateTag(newTag: Readonly<TagState>): void;
    removeTags(startTag: Readonly<TagState>, endTag?: Readonly<TagState> | undefined, useSpaces?: boolean): void;
    removeBlocks(startBlock: Readonly<BlockState>, endBlock?: Readonly<BlockState>): void;
    mergeBlocks(targetBlockId: string, sourceBlockId: string): void;
}

function mergeSameTypeTags(block: Readonly<BlockState>, useSpaces = false) {
    return block.createCopy((newBlock: BlockState) => {
        const newTags: TagState[] = [];

        for(let i = 0; i < block.contents.length; i++) {
            const currentTag = block.contents[i] as TagState;
            const previousIndex = newTags.length - 1;
            const previousTag = newTags[previousIndex] as TagState;

            if(previousTag && previousTag.type == currentTag.type) {
                newTags[previousIndex] = previousTag.createCopy(newTag => {
                    const text = useSpaces ? " " + currentTag.content : currentTag.content;
                    newTag.content = previousTag.content.concat(text);
                })
            }

            else {
                newTags.push(currentTag);
            }
        }

        newBlock.contents = newTags;
    })
}
export const usePostStore = create<PostStoreState>((set) => ({
    blocks: [],
    setBlocks: (blocks: BlockState[]) => set(state => ({blocks})),

    mergeBlocks: (targetBlockId: string, sourceBlockId: string) => set(state => {

        const newBlocks: BlockState[] = [];

        let targetBlock: Readonly<BlockState> | undefined;
        let sourceBlock: Readonly<BlockState> | undefined;
        let targetBlockIndex: number | undefined;

        for(let i = 0; i < state.blocks.length; i++) {
            const currentBlock = state.blocks[i];
            if(currentBlock.id == targetBlockId) {
                targetBlockIndex = i;
                targetBlock = currentBlock;
            }
            if(currentBlock.id == sourceBlockId) {
                sourceBlock = currentBlock;
                continue;
            }
            newBlocks.push(currentBlock);
        }

        if(targetBlock && sourceBlock && targetBlockIndex != undefined) {
            const newBlock = (targetBlock.createCopy(newBlock => {
                const newContentStates: ContentState[] = [...targetBlock.contents]

                for(let contentState of sourceBlock.contents) {
                    newContentStates.push(contentState.createCopy(newContentState => {
                        const contentId = contentState.id.split("-")[1];
                        newContentState.id = `${targetBlock.id}-${contentId}`;
                    }))
                }
                newBlock.contents = newContentStates;
            }));

            newBlocks[targetBlockIndex] = mergeSameTypeTags(newBlock);
        }

        return {
           blocks: newBlocks
       }
    }),

    removeBlocks: (startBlock: Readonly<BlockState>, endBlock?: Readonly<BlockState>) => set(state => {
        const newBlocks: BlockState[] = [];
        let stopPushing: boolean = false;
        if(!endBlock) endBlock = startBlock;

        for(let oldBlock of state.blocks) {
            if(oldBlock.id == endBlock.id) {
                stopPushing = false;
                continue;
            }

            else if(oldBlock.id == startBlock.id) {
                stopPushing = true;
            }

            if(!stopPushing) newBlocks.push(oldBlock);
        }

       return {
            blocks: newBlocks
       }
    }),

    removeTags: (startTag: Readonly<TagState>, endTag?: Readonly<TagState> | undefined, useSpaces = false) => set(state => {
        const newBlocks: BlockState[] = [];
        const pathIds = startTag.id.split("-");

        for(let oldBlock of state.blocks) {
            if(oldBlock.id == pathIds[0]) {
                const newBlock = oldBlock.createCopy((newBlock) => {
                    if(!endTag) endTag = startTag;
                    const newTags: TagState[] = [];

                    let stopPushing: boolean = false;
                    for(let i = 0; i < oldBlock.contents.length; i++) {
                        let currentTag = (oldBlock as TextBlockState).contents[i];

                        if(currentTag.id == endTag.id) {
                            stopPushing = false; // Parar de excluir depois daqui
                            continue;
                        }

                        else if(currentTag.id == startTag.id) {
                            stopPushing = true; // Excluir a partir daqui
                        }

                        if(!stopPushing) newTags.push(currentTag);
                    }

                    newBlock.contents = newTags;
                });


                newBlocks.push(mergeSameTypeTags(newBlock as TextBlockState, useSpaces));
                continue;
            }

            newBlocks.push(oldBlock);
        }

        return {
            blocks: newBlocks
        };
    }),

    updateTag: (newTag: Readonly<TagState>) => set(state => {
        const pathIds = newTag.id.split('-');
        const newBlocks: BlockState[] = [];

        for(let block of state.blocks) {
            if(block.id == pathIds[0]) {
                const oldBlock = block as TextBlockState;

                newBlocks.push(oldBlock.createCopy((newBlock) => {
                    const newTags: TagState[] = [];

                    for(let i = 0; i < oldBlock.contents.length; i++) {
                        const currentTag = oldBlock.contents[i];

                        if(currentTag.id == newTag.id) newTags.push(newTag);
                        else newTags.push(currentTag);

                        const lastAddedTag = newTags[newTags.length - 1];
                    }

                    newBlock.contents = newTags;
                }))

                continue;
            }

            newBlocks.push(mergeSameTypeTags(block as TextBlockState));
        }

        return {
            blocks: newBlocks
        };
    })
}));

export function usePostBlocks() {
    return usePostStore((state) => ({
        blocks: state.blocks,
        setBlocks: state.setBlocks
    }));
}