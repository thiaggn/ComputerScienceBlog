import getSelectionDirection from "./getSelectionDirection.ts";

export default function getSelectionStart() {
    const direction = getSelectionDirection();
    const selection = document.getSelection() as Selection;
    const {focusNode, focusOffset, anchorNode, anchorOffset} = selection;

    if(focusNode && anchorNode) {
        const startNode = direction > 0 ? anchorNode : focusNode;
        const startOffset = direction > 0 ? anchorOffset : focusOffset;
        return {startNode, startOffset};
    }
}