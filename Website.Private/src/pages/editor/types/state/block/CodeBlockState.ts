import {BlockState, BlockType} from "../BlockState.ts";
import {Mutable} from "../../Mutable.ts";
import {ContentState} from "../ContentState.ts";

export class CodeBlockState extends BlockState {
    type: BlockType.Code = BlockType.Code;
    contents: ReadonlyArray<ContentState>;

    constructor(id: string, contents: ReadonlyArray<ContentState>) {
        super(id);
        this.contents = contents;
    }

    public createCopy(mutator?: (block: CodeBlockState) => void) {
        const copy = new CodeBlockState(this.id, [...this.contents]);
        if(mutator) mutator(copy);
        return copy;
    }
}