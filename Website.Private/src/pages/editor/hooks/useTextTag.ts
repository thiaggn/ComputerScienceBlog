import {TagState} from "../types/data/TagState.ts";
import {RefObject, useEffect} from "react";
import {BlockState} from "../types/data/BlockState.ts";
import {usePostStore} from "../../../store/postStore.ts";
import {EditorInputListener} from "./EditorInputListener.ts";
import {CaretSnapshot} from "../types/CaretSnapshot.ts";
import useTag from "./useTag.ts";

export default function useTextTag(tagState: TagState, editableElement: RefObject<HTMLDivElement>) {
    useTag(tagState, editableElement);

    useEffect(() => {
        const tagElement = editableElement.current;
        if (tagElement) {



            return () => {

            };
        }

    }, [tagState]);
}
