import {TagState} from "../types/texteditor/TagState.ts";
import {RefObject, useEffect} from "react";
import {BlockState} from "../types/texteditor/BlockState.ts";
import {usePostStore} from "../../../store/postStore.ts";
import {SelectionService} from "../SelectionService.ts";
import {CaretPositionRecord} from "../types/CaretPositionRecord.ts";

declare global {
    export interface HTMLElementEventMap {
        "removed": CustomEvent
        "updated": CustomEvent<string>
    }
}
export default function useTag(currentTag: TagState, parentBlock: BlockState, ref: RefObject<HTMLDivElement>) {

    const post = usePostStore(state => ({
        updateTag: state.updateTag,
        removeTags: state.removeTags
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

                            const newTag = {
                                ...currentTag,
                                content: tagHtmlElement.innerText
                            } satisfies TagState;

                            handleCaretUpdate(newTag, currentTag);
                            post.updateTag(parentBlock.id, newTag);
                        }

                        break;
                    }
                }
            });

            const handleTagRemoval = () => {
                post.removeTags(parentBlock.id, [currentTag.id]);
                console.log(`%cdeleted tag %c"${currentTag.content}"`, 'color: red', 'color: white');
            }

            const handleTagUpdate = (ev: CustomEvent<string>) => {
                post.updateTag(parentBlock.id, {
                    ...currentTag,
                    content: ev.detail
                })

                console.log(`%cupdated tag %c"${ev.detail}"`, 'color: pink', 'color: white');
            }

            tagElement.addEventListener("removed", handleTagRemoval);
            tagElement.addEventListener("updated", handleTagUpdate);
            observer.observe(tagElement, {
                characterData: true,
                subtree: true
            })

            return () => {
                tagElement.removeEventListener("removed", handleTagRemoval);
                tagElement.removeEventListener("updated", handleTagUpdate);
                observer.disconnect();
            };
        }

    }, [currentTag]);
}


const handleCaretUpdate = (newTag: TagState, currentTag: TagState) => {
    const lastSelection = SelectionService.lastSelection;
    if (lastSelection) {
        let caretPosition: CaretPositionRecord;

        if (lastSelection.type === 'Caret') {
            const difference = newTag.content.length - currentTag.content.length;
            const direction = difference > 0 ? 1 : -1;
            caretPosition = {
                node: lastSelection.focusNode,
                offset: lastSelection.focusOffset + direction
            };
        } else {
            const isLeftToRight = lastSelection.anchorOffset < lastSelection.focusOffset;

            if (isLeftToRight) {
                caretPosition = {
                    node: lastSelection.anchorNode,
                    offset: lastSelection.anchorOffset
                }
            } else {
                caretPosition = {
                    node: lastSelection.focusNode,
                    offset: lastSelection.focusOffset
                }
            }
        }

        SelectionService.nextCaretPosition = caretPosition;
    }
}