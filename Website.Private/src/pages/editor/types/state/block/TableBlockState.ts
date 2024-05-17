import {BlockState, BlockType} from "../BlockState.ts";
import {Mutable} from "../../Mutable.ts";

export class TableBlockState extends BlockState {
    type: BlockType.Table = BlockType.Table;
    contents: ReadonlyArray<object>;

    constructor(id: string, contents: ReadonlyArray<object>) {
        super(id);
        this.contents = contents;
    }

    public createCopy(mutator?: (block: TableBlockState) => void) {
        const copy = new TableBlockState(this.id, [...this.contents]);
        if(mutator) mutator(copy);
        return copy;
    }
}