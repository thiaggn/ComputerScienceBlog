import {RefObject, useEffect} from "react";
import {BlockState} from "../types/state/BlockState.ts";
import {BlockStateRequest} from "../events/EditorStateRequest.ts";

export function useBlockEvents(ref: RefObject<HTMLElement>, state: BlockState) {
    const handleRequest = (ev: CustomEvent<BlockStateRequest>) => ev.detail.accept(state);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        element.addEventListener("blockstaterequest", handleRequest);
        return () => element.removeEventListener("blockstaterequest", handleRequest);
    }, [state]);
}