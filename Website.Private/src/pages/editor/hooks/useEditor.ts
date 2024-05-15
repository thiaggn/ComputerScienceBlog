import {RefObject, useEffect} from "react";
import {BlockState} from "../types/state/BlockState.ts";
import {EditorCaretHandler} from "../EditorCaretHandler.ts";

export default function useEditor(ref: RefObject<HTMLDivElement>, blockStates: BlockState[]) {
    useEffect(() => {
        EditorCaretHandler.updateCaretPosition();
    });
}