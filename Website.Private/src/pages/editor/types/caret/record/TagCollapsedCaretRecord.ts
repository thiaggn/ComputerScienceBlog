import {SelectionFormat} from "../SelectionFormat.ts";

import {CaretRecord} from "../CaretRecord.ts";

export class TagCollapsedCaretRecord implements CaretRecord {
    format = SelectionFormat.TagCollapsed;
    tagId: string;
    offset: number;

    constructor(id: string, offset: number) {
        this.tagId = id;
        this.offset = offset;
    }
}