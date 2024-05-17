import {BlockState, BlockType} from "../BlockState.ts";
import {Mutable} from "../../Mutable.ts";

export class MathBlockState extends BlockState {
    type: BlockType.Math = BlockType.Math;
    contents: ReadonlyArray<object>;

    constructor(id: string, contents: ReadonlyArray<object>) {
        super(id);
        this.contents = contents;
    }

    public createCopy(mutator?: (block: MathBlockState) => void) {
        const copy = new MathBlockState(this.id, [...this.contents]);
        if(mutator) mutator(copy);
        return copy;
    }
}