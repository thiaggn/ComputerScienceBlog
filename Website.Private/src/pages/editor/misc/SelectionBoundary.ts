import {TagState} from "../types/state/TagState.ts";
import {BlockState} from "../types/state/BlockState.ts";

export class SelectionBoundary {
    tag: Readonly<TagState>;
    block: Readonly<BlockState>;
    unselectedText: string;
    node: Node;
    offset: number;

    constructor(tag: TagState, block: Readonly<BlockState>, unselectedText: string, node: Node, offset: number) {
        this.tag = tag;
        this.block = block;
        this.unselectedText = unselectedText;
        this.node = node;
        this.offset = offset;
    }
}