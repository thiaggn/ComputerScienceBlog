import {BlockState, BlockType} from "../BlockState.ts";
import {Mutable} from "../../Mutable.ts";
import {ContentState} from "../ContentState.ts";

export class ImageBlockState extends BlockState {
    type: BlockType.Image = BlockType.Image;
    contents: ReadonlyArray<ContentState>;

    constructor(id: string, contents: ReadonlyArray<ContentState>) {
        super(id);
        this.contents = contents;
    }

    public createCopy(mutator?: (block: ImageBlockState) => void) {
        const copy = new ImageBlockState(this.id, [...this.contents]);
        if(mutator) mutator(copy);
        return copy;
    }
}