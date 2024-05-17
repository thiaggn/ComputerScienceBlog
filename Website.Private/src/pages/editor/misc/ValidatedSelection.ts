import {SelectionMode} from "./SelectionMode.ts";

export type ValidatedSelection = {
    mode: SelectionMode;
    startNode: Node,
    startContent: string,
    startOffset: number,
    endNode: Node,
    endOffset: number,
    endContent: string,
    withinSameElement: boolean
}
