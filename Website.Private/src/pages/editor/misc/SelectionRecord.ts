import {SelectionMode} from "./SelectionMode.ts";


export class SelectionRecord {
    startTagId: string;
    startOffset: number;
    endTagId: string;
    endOffset: number;
    mode: SelectionMode;

    constructor(mode: SelectionMode, startTagId: string, startOffset: number, endTagId: string, endOffset: number) {
        this.startTagId = startTagId;
        this.startOffset = startOffset;
        this.endTagId = endTagId;
        this.endOffset = endOffset;
        this.mode = mode;
    }

    public static createCollapsed(startId: string, offset: number) {
        return new SelectionRecord(
            SelectionMode.Caret,
            startId, offset,
            startId, offset
        )
    }
}

