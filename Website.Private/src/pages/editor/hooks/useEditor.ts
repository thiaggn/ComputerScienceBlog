import {RefObject, useEffect} from "react";
import {usePostStore} from "../../../store/postStore.ts";
import {BlockState} from "../types/editor_elements/state/BlockState.ts";

export default function useEditor(ref: RefObject<HTMLDivElement>, blockStates: BlockState<unknown>[]) {


    useEffect(() => {
        const element = ref.current;
        if (element) {

        }
    });
}