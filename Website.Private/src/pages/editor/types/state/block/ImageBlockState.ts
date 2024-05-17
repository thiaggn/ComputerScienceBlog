import {BlockState, BlockType} from "../BlockState.ts";
import {Mutable} from "../../Mutable.ts";

export class ImageBlockState extends BlockState {
    type: BlockType.Image = BlockType.Image;
    contents: ReadonlyArray<object>;

    constructor(id: string, contents: ReadonlyArray<object>) {
        super(id);
        this.contents = contents;
    }

    public createCopy(mutator?: (block: ImageBlockState) => void) {
        const copy = new ImageBlockState(this.id, [...this.contents]);
        if(mutator) mutator(copy);
        return copy;
    }
}