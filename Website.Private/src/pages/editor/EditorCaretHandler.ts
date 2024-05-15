import getSelectionStart from "../../utils/getSelectionStart.ts";
import {requestTagState} from "./utils/requestTagState.ts";
import {SelectionFormat} from "./types/caret/SelectionFormat.ts";
import {TagCollapsedCaretRecord} from "./types/caret/record/TagCollapsedCaretRecord.ts";
import {NodeColappsedCaretRecord} from "./types/caret/record/NodeCollapsedCaretRecord.ts";
import {TagRangedCaretRecord} from "./types/caret/record/TagRangedCaretRecord.ts";
import {CaretRecord} from "./types/caret/CaretRecord.ts";

export class EditorCaretHandler {
    private static nextCaretPosition: CaretRecord | null;

    private static initialCaretPosition: CaretRecord | null;
    public static async setNextCaretPosition(value: CaretRecord) {
        if(this.initialCaretPosition == null) {
            const startPoint = getSelectionStart();

            if(startPoint) {
                const editable = startPoint.startNode.parentElement;

                if(editable instanceof Element && editable.hasAttribute("editor-editable")) {
                    const tagElement = editable.parentElement;

                    if(tagElement) {
                        const tagState = await requestTagState(tagElement);
                        this.initialCaretPosition = new TagCollapsedCaretRecord(
                            tagState.id, startPoint.startOffset - 1
                        )
                    }
                }
            }
        }

        this.nextCaretPosition = value;
    }
    public static updateCaretPosition() {
        let caret = this.nextCaretPosition;

        if(this.nextCaretPosition == null && this.initialCaretPosition){
            caret = this.initialCaretPosition;
        }

        const selection = document.getSelection();
        if(!caret || !selection) return;

        switch (caret.format) {
            case SelectionFormat.NodeCollapsed: {
                const {node, offset} = caret as NodeColappsedCaretRecord;
                selection.setPosition(node, offset);
                break;
            }

            case SelectionFormat.TagCollapsed: {
                const {tagId, offset} = caret as TagCollapsedCaretRecord;
                const tagElement = document.getElementById(tagId);
                const editable = tagElement?.querySelector("[editor-editable]");
                const textNode = editable?.firstChild;
                if(textNode) selection.setPosition(textNode, offset);
                break;
            }

            case SelectionFormat.TagRanged: {
                const {startTagId, endTagId} = caret as TagRangedCaretRecord;
                const {startOffset, endOffset} = caret as TagRangedCaretRecord;

                const startEditable = document.querySelector(`#${startTagId} [editor-editable]`);
                const endEditable = document.querySelector(`#${endTagId} [editor-editable]`);

                if(startEditable && endEditable) {
                    const startTextNode = startEditable.firstChild as Node;
                    const endTextNode = endEditable.firstChild as Node;

                    selection.setBaseAndExtent(
                        startTextNode, startOffset,
                        endTextNode, endOffset
                    );
                }

                break;
            }
        }

        this.nextCaretPosition = null;
    }
}