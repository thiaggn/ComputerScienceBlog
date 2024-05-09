import {BlockState} from "../types/state/BlockState.ts";
import {RefObject, useEffect} from "react";
import {usePostStore} from "../../../store/postStore.ts";
import {TagIdRequestEvent} from "./useTag.ts";

export default function useBlock(blockState: BlockState, blockElement: RefObject<HTMLDivElement>) {
    const post = usePostStore((state) => ({
        removeTag: state.removeTag,
    }))

    useEffect(() => {
        if (blockElement.current) {
            const observer = new MutationObserver(async (mutations: MutationRecord[]) => {
                for (let mutation of mutations) {

                    if (mutation.type == "childList") {
                        for (let removedNode of mutation.removedNodes) {
                            const tagId: any = await new Promise<string>((res) => {
                                const event = new CustomEvent<TagIdRequestEvent>("tagid", {
                                    detail: {
                                        blockId: blockState.id,
                                        respond: (id: string) => res(id)
                                    }
                                });

                                removedNode.dispatchEvent(event);
                            })


                            blockElement.current?.appendChild(removedNode);
                            post.removeTag(blockState.id, tagId);
                        }
                    }
                }
            })

            observer.observe(blockElement.current, {
                childList: true
            })

            return () => {
                observer.disconnect();
            }
        }
    }, [blockState]);
}