import {TagState} from "../types/state/TagState.ts";
import {RefObject, useEffect} from "react";
import {BlockState} from "../types/state/BlockState.ts";
import {usePostStore} from "../../../store/postStore.ts";
import {SelectionObserver} from "../misc/SelectionObserver.ts";

export type TagIdRequestEvent = {
    blockId: any,
    respond: (tagId: any) => void
}

declare global {
    export interface HTMLElementEventMap {
        "tagid": CustomEvent<TagIdRequestEvent>
    }
}
export default function useTag(currentTag: TagState, parentBlock: BlockState, ref: RefObject<HTMLDivElement>) {

    const post = usePostStore(state => ({
        updateTag: state.updateTag,
        setOffset: state.setOffset
    }))

    useEffect(() => {
        const element = ref.current;

        if (element) {
            const observer = new MutationObserver((mutations: MutationRecord[]) => {
                for (let mutation of mutations) {
                    if (mutation.type == "characterData") {
                        const tagHtmlElement = mutation.target.parentElement;

                        if (tagHtmlElement) {
                            if (tagHtmlElement.innerText.length > 0) {
                                const newTag = {
                                    ...currentTag,
                                    content: tagHtmlElement.innerText
                                }

                                post.updateTag(parentBlock.id, newTag);

                                const lastSelection = SelectionObserver.lastSelection;

                                if(lastSelection) {

                                    if(lastSelection.type === 'Caret') {
                                        const difference = newTag.content.length - currentTag.content.length;
                                        const direction = difference > 0 ? 1 : -1;
                                        post.setOffset(direction)
                                    }

                                    else {

                                        if(lastSelection.anchorOffset < lastSelection.focusOffset) {
                                            post.setOffset(0.5);
                                        }

                                        else {
                                            post.setOffset(-0.5);
                                        }

                                    }
                                }
                            }
                        }

                        break;
                    }
                }
            });

            observer.observe(element.firstChild!, {
                characterData: true,
            })

            const handleTagIdRequest = (ev: CustomEvent<TagIdRequestEvent>) => {
                if (ev.detail.blockId == parentBlock.id) {
                    ev.detail.respond(currentTag.id);
                } else throw new Error();
            };

            ref.current.addEventListener("tagid", handleTagIdRequest)

            return () => {
                element.removeEventListener("tagid", handleTagIdRequest)
                observer.disconnect();
            };
        }

    }, [currentTag]);
}