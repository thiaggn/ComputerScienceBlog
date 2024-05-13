import {BlockState} from "../types/editor_elements/state/BlockState.ts";
import {RefObject, useEffect} from "react";
import {usePostStore} from "../../../store/postStore.ts";
import {TagState} from "../types/editor_elements/state/TagState.ts";


export default function useTextBlock(blockState: BlockState<TagState>, editableElement: RefObject<HTMLDivElement>) {
    useEffect(() => {
        const blockElement = editableElement.current;

        if(blockElement) {
            blockElement.addEventListener("blockmutation", (ev) => {
                const mutations = ev.detail;
            });
        }

    }, [blockState]);
}