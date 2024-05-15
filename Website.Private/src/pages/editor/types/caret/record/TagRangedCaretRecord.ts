import {SelectionFormat} from "../SelectionFormat.ts";

import {CaretRecord} from "../CaretRecord.ts";

export class TagRangedCaretRecord implements CaretRecord {
    format = SelectionFormat.TagRanged;
    startTagId: string;
    endTagId: string;
    startOffset: number;
    endOffset: number;

    constructor(startTagId: string, startOffset: number, endTagId: string, endOffset: number) {
        this.startTagId = startTagId;
        this.startOffset = startOffset;
        this.endTagId = endTagId;
        this.endOffset = endOffset;
    }
}