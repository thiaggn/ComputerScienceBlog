import {RefObject, useEffect} from "react";
import {TagState} from "../types/state/TagState.ts";
import {TagStateRequest} from "../events/EditorStateRequest.ts";
import {usePostStore} from "../PostStore.ts";
import {Mutable} from "../types/Mutable.ts";
import {TextBlockState} from "../types/state/block/TextBlockState.ts";

export function useTagEvents(ref: RefObject<HTMLElement>, state: TagState) {
    const handleRequest = (ev: CustomEvent<TagStateRequest>) => ev.detail.accept(state);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        element.addEventListener("tagstaterequest", handleRequest);

        return () => {
            element.removeEventListener("tagstaterequest", handleRequest);
        }

    }, [state]);
}