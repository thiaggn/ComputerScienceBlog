import {BlockState} from "../types/state/BlockState.ts";
import {RefObject, useEffect} from "react";
import {ContentState} from "../types/state/ContentState.ts";
import useBlock from "./useBlock.ts";


export default function useTextBlock(blockState: BlockState, editableElement: RefObject<HTMLDivElement>) {
    useBlock(blockState, editableElement);

    useEffect(() => {
        const blockElement = editableElement.current;

        if(blockElement) {

        }

    }, [blockState]);
}