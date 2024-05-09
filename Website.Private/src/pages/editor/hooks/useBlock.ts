import {BlockState} from "../types/state/BlockState.ts";
import {RefObject, useEffect} from "react";
import {usePostStore} from "../../../store/postStore.ts";
import {TagIdRequestEvent} from "./useTag.ts";
import {TagState} from "../types/state/TagState.ts";

export default function useBlock(currentBlock: BlockState, ref: RefObject<HTMLDivElement>) {
    const post = usePostStore((state) => ({
        removeTags: state.removeTags,
    }))

    useEffect(() => {
        const blockElement = ref.current;

        if (blockElement) {
            blockElement.setAttribute("editor-block-element", currentBlock.type.toString());

            const observer = new MutationObserver(async (mutations: MutationRecord[]) => {

                const nodesToAdd: Node[] = [];
                const tagsToAdd: TagState[] = [];

                const nodesToRemove: Node[] = [];
                const tagIdsToRemove: any[] = [];

                for (let mutation of mutations) {
                    if (mutation.type == "childList") {
                        for (let removedNode of mutation.removedNodes) nodesToRemove.push(removedNode)
                        for (let addedNode of mutation.addedNodes) nodesToAdd.push(addedNode);
                    }
                }

                for(let removedNode of nodesToRemove) {
                    const tagId: any = await new Promise<string>((res) => {
                        const event = new CustomEvent<TagIdRequestEvent>("tagid", {
                            detail: {
                                parentBlock: currentBlock.id,
                                accept: (tagId: string) => res(tagId)
                            }
                        });

                        removedNode.dispatchEvent(event);
                    })

                    blockElement?.appendChild(removedNode);
                    tagIdsToRemove.push(tagId);
                }

                post.removeTags(currentBlock.id, tagIdsToRemove);
            })

            observer.observe(blockElement, {
                childList: true
            })

            return () => {
                observer.disconnect();
            }
        }
    }, [currentBlock]);
}