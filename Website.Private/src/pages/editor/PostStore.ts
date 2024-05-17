import {create} from "zustand";
import {PostState} from "./types/state/PostState.ts";
import {BlockState} from "./types/state/BlockState.ts";
import {TagState, TagStyle} from "./types/state/TagState.ts";
import {TextBlockState} from "./types/state/block/TextBlockState.ts";

interface PostStoreState extends PostState {
    setBlocks(blocks: BlockState[]): void;
    updateTag(newTag: Readonly<TagState>): void;
    removeTags(startTag: Readonly<TagState>, endTag?: Readonly<TagState> | undefined, useSpaces?: boolean): void;
    removeBlocks(startBlock: Readonly<BlockState>, endBlock?: Readonly<BlockState>): void
}

function mergeSameTypeTags(block: Readonly<TextBlockState>, useSpaces = false) {
    return block.createCopy((newBlock: BlockState) => {
        const newTags: TagState[] = [];

        for(let currentTag of block.contents) {
            const previousIndex = newTags.length - 1;
            const previousTag = newTags[previousIndex];

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
        console.log("Requested tag deletion", startTag, endTag);
        const newBlocks: BlockState[] = [];
        const pathIds = startTag.id.split("-");

        for(let oldBlock of state.blocks) {
            if(oldBlock.id == pathIds[0]) {
                const newBlock = oldBlock.createCopy((newBlock) => {
                    if(!endTag) endTag = startTag;
                    const newTags: TagState[] = [];

                    for(let i = 0; i < oldBlock.contents.length; i++) {
                        let stopPushing: boolean = false;
                        let currentTag = (oldBlock as TextBlockState).contents[i];

                        if(currentTag.id == startTag.id) {
                            stopPushing = true; // Excluir a partir daqui
                        }

                        if(currentTag.id == endTag.id) {
                            stopPushing = false; // Parar de excluir depois daqui
                            continue;
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
        console.log("Requested tag update", newTag);
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