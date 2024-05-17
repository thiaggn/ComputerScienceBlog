import {SelectionBoundary} from "./SelectionBoundary.ts";
import {ValidatedSelection} from "./ValidatedSelection.ts";
import {SelectionMode} from "./SelectionMode.ts";
import {requestTagState} from "../events/requestTagState.ts";
import {requestBlockState} from "../events/requestBlockState.ts";


export class SelectionEvent {
    public mode: SelectionMode;
    public sameElement: boolean;
    public start: SelectionBoundary;
    public end: SelectionBoundary;
    private constructor(mode: SelectionMode, start: SelectionBoundary, end: SelectionBoundary, same: boolean) {
        this.start = start;
        this.end = end;
        this.mode = mode;
        this.sameElement = same;
    }

    public static async tryGet() {
        const selection = this.tryGetSelection();
        if (!selection) return null;

        const startStates = await this.getElementStates(selection.startNode);
        const endStates = await this.getElementStates(selection.endNode);
        if(startStates == null || endStates == null) return null;

        const startUnselectedText = this.getUnselectedText(selection, selection.startNode);
        const endUnselectedText = this.getUnselectedText(selection, selection.endNode);

        const startPoint = new SelectionBoundary(
            startStates.tagState,
            startStates.blockState,
            startUnselectedText,
            selection.startNode,
            selection.startOffset
        )

        const endPoint = new SelectionBoundary(
            endStates.tagState,
            endStates.blockState,
            endUnselectedText,
            selection.endNode,
            selection.endOffset
        )

        return new SelectionEvent(selection.mode, startPoint, endPoint, selection.withinSameElement);
    }

    private static getUnselectedText(selection: ValidatedSelection, node: Node) {

        if(selection.withinSameElement && node == selection.startNode) {
            const firstPart = selection.startContent.slice(0, selection.startOffset);
            const secondPart = selection.startContent.slice(selection.endOffset);
            return firstPart.concat(secondPart);
        }

        if(node == selection.startNode) {
            return selection.startContent.slice(0, selection.startOffset);
        }

        if(node == selection.endNode) {
            return selection.endContent.slice(selection.endOffset);
        }

        return ""
    }

    private static async getElementStates(node: Node) {
        const tagElement = node.parentElement?.closest("[editor-tag]");
        const blockElement = node.parentElement?.closest("[editor-block]");

        if (tagElement && blockElement) {
            const tagState = await requestTagState(tagElement);
            const blockState = await requestBlockState(blockElement);
            return {tagState, blockState};
        }

        return null;
    }

    private static tryGetSelection(): ValidatedSelection | null {
        const selection = document.getSelection();
        if (selection == null) return null;
        const {anchorNode, focusNode, anchorOffset, focusOffset} = selection;

        if (anchorNode == null || focusNode == null) return null;
        let startNode = anchorNode;
        let startOffset = anchorOffset;
        let endNode = focusNode;
        let endOffset = focusOffset;
        let position = anchorNode.compareDocumentPosition(focusNode);

        if(startNode != focusNode) {
            if(position == Node.DOCUMENT_POSITION_PRECEDING) {
                [startNode, endNode] = [endNode, startNode];
                [startOffset, endOffset] = [endOffset, startOffset];
            }
        }

        else if(startOffset > endOffset) {
            [startOffset, endOffset] = [endOffset, startOffset];
        }


        return {
            mode: selection.type == "Range" ? SelectionMode.Range : SelectionMode.Caret,
            startNode: startNode,
            startOffset: startOffset,
            startContent: startNode.textContent || "",
            endNode: endNode,
            endOffset: endOffset,
            endContent: endNode.textContent || "",
            withinSameElement: startNode == endNode,
        }
    }
}

