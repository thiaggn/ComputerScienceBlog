export default function getSelectionDirection() {
    const selection = document.getSelection();

    if(!selection) return 0;
    if(!selection.focusNode || !selection.anchorNode) return 0;

    const position = selection.focusNode.compareDocumentPosition(selection.anchorNode);
    let direction: number = 0;

    switch (position) {
        case Node.DOCUMENT_POSITION_FOLLOWING:
            direction = -1;
            break;
        case Node.DOCUMENT_POSITION_PRECEDING:
            direction = 1;
            break;
    }

    return direction;
}