import {SelectionFormat} from "../SelectionFormat.ts";

import {CaretRecord} from "../CaretRecord.ts";

export class NodeColappsedCaretRecord implements CaretRecord {
    format = SelectionFormat.NodeCollapsed;
    node: Node;
    offset: number;

    constructor(node: Node, offset: number) {
        this.node = node;
        this.offset = offset;
    }
}