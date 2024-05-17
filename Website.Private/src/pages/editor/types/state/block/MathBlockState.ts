import {BlockState, BlockType} from "../BlockState.ts";
import {Mutable} from "../../Mutable.ts";
import {ContentState} from "../ContentState.ts";

export class MathBlockState extends BlockState {
    type: BlockType.Math = BlockType.Math;
    contents: ReadonlyArray<ContentState>;

    constructor(id: string, contents: ReadonlyArray<ContentState>) {
        super(id);
        this.contents = contents;
    }

    public createCopy(mutator?: (block: MathBlockState) => void) {
        const copy = new MathBlockState(this.id, [...this.contents]);
        if(mutator) mutator(copy);
        return copy;
    }
}