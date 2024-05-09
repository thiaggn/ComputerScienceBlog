import {SelectionRecord} from "./SelectionRecord.ts";

export class SelectionObserver {

    private static lastSelectionRecord: SelectionRecord | undefined;
    private constructor() {

    }

    public static observe() {
        document.addEventListener("selectionchange", (ev) => {
            const selection = document.getSelection();
            if(selection) {
                this.lastSelectionRecord = new SelectionRecord(selection);
            }
        })
    }

    static get lastSelection() {
        return this.lastSelectionRecord;
    }

}