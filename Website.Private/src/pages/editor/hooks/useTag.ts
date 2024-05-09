import {TagState} from "../types/state/TagState.ts";
import {RefObject, useEffect} from "react";
import {BlockState} from "../types/state/BlockState.ts";
import {usePostStore} from "../../../store/postStore.ts";
import {SelectionObserver} from "../misc/SelectionObserver.ts";
import {CaretPosition} from "../types/CaretPosition.ts";
import {is} from "immutable";

export type TagIdRequestEvent = {
    parentBlock: any,
    accept: (tagId: any) => void
}

declare global {
    export interface HTMLElementEventMap {
        "tagid": CustomEvent<TagIdRequestEvent>
    }
}
export default function useTag(currentTag: TagState, parentBlock: BlockState, ref: RefObject<HTMLDivElement>) {

    const post = usePostStore(state => ({
        updateTag: state.updateTag,
        setCaretPosition: state.setCaretPosition
    }))

    useEffect(() => {
        const tagElement = ref.current;

        if (tagElement) {
            tagElement.setAttribute("editor-tag-element", currentTag.type.toString());

            const observer = new MutationObserver((mutations: MutationRecord[]) => {

                for (let mutation of mutations) {
                    if (mutation.type == "characterData") {
                        const tagHtmlElement = mutation.target.parentElement;

                        if (tagHtmlElement) {
                            if (tagHtmlElement.innerText.length > 0) {
                                const newTag = {
                                    ...currentTag,
                                    content: tagHtmlElement.innerText
                                } satisfies TagState;

                                post.updateTag(parentBlock.id, newTag);

                                const lastSelection = SelectionObserver.lastSelection;

                                if (lastSelection) {

                                    if (lastSelection.type === 'Caret') {
                                        const difference = newTag.content.length - currentTag.content.length;
                                        const direction = difference > 0 ? 1 : -1;
                                        post.setCaretPosition({
                                            node: lastSelection.focusNode,
                                            offset: lastSelection.focusOffset + direction
                                        } satisfies CaretPosition);
                                    }

                                    else {
                                        const isLeftToRight = lastSelection.anchorOffset < lastSelection.focusOffset;

                                        if(isLeftToRight) {
                                            post.setCaretPosition({
                                                node: lastSelection.anchorNode,
                                                offset: lastSelection.anchorOffset
                                            })
                                        }
                                        
                                        else {
                                            post.setCaretPosition({
                                                node: lastSelection.focusNode,
                                                offset: lastSelection.focusOffset
                                            })
                                        }
                                    }
                                }
                            }
                        }

                        break;
                    }
                }
            });

            observer.observe(tagElement.firstChild!, {
                characterData: true,
            })

            const handleTagIdRequest = (ev: CustomEvent<TagIdRequestEvent>) => {
                if (ev.detail.parentBlock == parentBlock.id) {
                    ev.detail.accept(currentTag.id);
                } else throw new Error();
            };

            ref.current.addEventListener("tagid", handleTagIdRequest)

            return () => {
                tagElement.removeEventListener("tagid", handleTagIdRequest)
                observer.disconnect();
            };
        }

    }, [currentTag]);
}