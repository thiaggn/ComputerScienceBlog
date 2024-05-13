import {TagState} from "../types/editor_elements/state/TagState.ts";
import {RefObject, useEffect} from "react";
import {BlockState} from "../types/editor_elements/state/BlockState.ts";
import {usePostStore} from "../../../store/postStore.ts";
import {EditorInputListener} from "../EditorInputListener.ts";
import {CaretRecord} from "../types/CaretRecord.ts";

export default function useTextTag(tagState: TagState, editableElement: RefObject<HTMLDivElement>) {
    useEffect(() => {
        const tagElement = editableElement.current;
        if (tagElement) {



            return () => {

            };
        }

    }, [tagState]);
}
