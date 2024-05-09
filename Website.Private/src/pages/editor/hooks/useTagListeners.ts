import {TagState} from "../types/state/TagState.ts";
import {RefObject, useEffect} from "react";
import {BlockState} from "../types/state/BlockState.ts";
import {usePostStore} from "../../../store/postStore.ts";

export type TagIdRequestEvent = {
    blockId: any,
    respond: (tagId: any) => void
}

declare global {
    export interface HTMLElementEventMap {
        "tagid": CustomEvent<TagIdRequestEvent>
    }
}
export default function useTagListeners(data: TagState, parentBlock: BlockState, ref: RefObject<HTMLDivElement>) {

    const post = usePostStore(state => ({
        updateTag: state.updateTag,
    }))

    useEffect(() => {
        const element = ref.current;

        if (element) {
            const observer = new MutationObserver((mutations: MutationRecord[]) => {
                for (let mutation of mutations) {
                    if (mutation.type == "characterData") {
                        const target = mutation.target.parentElement;

                        if (target) {
                            if (target.innerText.length > 0) {
                                const newTag = {
                                    ...data,
                                    content: target.innerText
                                }

                                post.updateTag(parentBlock.id, newTag);
                                console.log("updated tag", newTag.id);
                            }
                        }

                        break;
                    }
                }
            });

            observer.observe(element.firstChild!, {
                characterData: true,
            })

            const handleTagIdRequest = (ev: CustomEvent<TagIdRequestEvent>) =>{
                if(ev.detail.blockId == parentBlock.id) {
                    ev.detail.respond(data.id);
                }

                else throw new Error();
            };

            ref.current.addEventListener("tagid", handleTagIdRequest)

            return () => {
                element.removeEventListener("tagid", handleTagIdRequest)
                observer.disconnect();
            };
        }

    }, []);
}