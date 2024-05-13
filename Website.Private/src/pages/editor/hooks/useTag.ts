
import {RefObject, useEffect} from "react";
import {TagState} from "../types/data/TagState.ts";

export default function useTag(tagState: TagState,  elementRef: RefObject<HTMLDivElement>) {
    useEffect(() => {
        const element = elementRef.current;
        if(!element) return;
        const handleStateRequest = (ev: CustomEvent<TagStateRequest>) => {
            ev.detail.accept(tagState);
        }

        element.addEventListener("tagstate", handleStateRequest);
        return () => element.removeEventListener("tagstate", handleStateRequest);
    }, [tagState]);
}