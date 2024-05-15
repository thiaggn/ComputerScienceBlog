
import {RefObject, useEffect} from "react";
import {ContentState} from "../types/state/ContentState.ts";
import {PostStoreMutation, usePostStore} from "../../../store/postStore.ts";
import {EditorCaretHandler} from "../EditorCaretHandler.ts";
import {NodeColappsedCaretRecord} from "../types/caret/record/NodeCollapsedCaretRecord.ts";

export default function useTag(tagState: ContentState, elementRef: RefObject<HTMLDivElement>) {

    useEffect(() => {
        const element = elementRef.current;
        if(!element) return;
        const handleStateRequest = (ev: CustomEvent<TagStateRequest>) => {
            ev.detail.accept(tagState);
        }

        const observer = new MutationObserver((mutations) => {
            const mutation = mutations[0];

            if(mutation.type == "characterData") {
                const newTag: ContentState = {
                    ...tagState,
                    content: mutation.target.textContent || ""
                }

                const selection = document.getSelection() as Selection;
                const focusNode = selection.focusNode as Node;

                EditorCaretHandler.setNextCaretPosition( new NodeColappsedCaretRecord(
                    focusNode, selection.focusOffset
                ));


                new PostStoreMutation()
                    .updateTextTags(tagState.parentId, [newTag])
                    .finish();
            }
        });

        observer.observe(element, {
            childList: true,
            subtree: true,
            characterData: true
        })

        element.addEventListener("tagstate", handleStateRequest);

        return () => {
            element.removeEventListener("tagstate", handleStateRequest);
            observer.disconnect();
        }

    }, [tagState]);
}