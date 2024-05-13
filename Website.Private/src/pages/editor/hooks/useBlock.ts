import {BlockState} from "../types/data/BlockState.ts";
import {RefObject, useEffect} from "react";

export default function useBlock(blockState: BlockState<unknown>,  elementRef: RefObject<HTMLDivElement>) {
    useEffect(() => {
        const element = elementRef.current;
        if(!element) return;
        const handleStateRequest = (ev: CustomEvent<BlockStateRequest>) => {
            ev.detail.accept(blockState);
        }

        element.addEventListener("blockstate", handleStateRequest);
        return () => element.removeEventListener("blockstate", handleStateRequest);
    }, [blockState]);
}