import {SelectionRecord} from "./types/SelectionRecord.ts";
import {CaretPositionRecord} from "./types/CaretPositionRecord.ts";

export class SelectionObserver {

    private static _lastSelection: SelectionRecord | undefined;
    private static _nextCaretPosition: CaretPositionRecord | undefined;

    private constructor() {}
    public static observe() {
        document.addEventListener("selectionchange", (ev) => {
            const selection = document.getSelection();
            if(selection) {
                this._lastSelection = new SelectionRecord(selection);
            }
        })
    }

    static get lastSelection() {
        return this._lastSelection;
    }

    static get nextCaretPosition(): CaretPositionRecord | undefined {
        return this._nextCaretPosition;
    }

    public static set nextCaretPosition(value: CaretPositionRecord) {
        this._nextCaretPosition = value;
    }
}