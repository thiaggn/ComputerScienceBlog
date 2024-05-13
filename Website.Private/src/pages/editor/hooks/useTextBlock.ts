import {BlockState} from "../types/data/BlockState.ts";
import {RefObject, useEffect} from "react";
import {TagState} from "../types/data/TagState.ts";
import useBlock from "./useBlock.ts";


export default function useTextBlock(blockState: BlockState<TagState>, editableElement: RefObject<HTMLDivElement>) {
    useBlock(blockState, editableElement);

    useEffect(() => {
        const blockElement = editableElement.current;

        if(blockElement) {

        }

    }, [blockState]);
}