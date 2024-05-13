import {RefObject, useEffect} from "react";
import {BlockState} from "../types/data/BlockState.ts";

export default function useEditor(ref: RefObject<HTMLDivElement>, blockStates: BlockState<unknown>[]) {


    useEffect(() => {
        const element = ref.current;
        if (element) {

        }
    });
}