import {TextTagState} from "../tag/TextTagState.ts";
import {CodeTagState} from "../tag/CodeTagState.ts";
import {LinkTagState} from "../tag/LinkTagState.ts";
import {BlockState, BlockType} from "../BlockState.ts";
import {TagState} from "../TagState.ts";
import  {Mutable} from "../../Mutable.ts";

export class TextBlockState extends BlockState {
    type: BlockType.Text = BlockType.Text;
    contents: ReadonlyArray<TagState>;

    constructor(id: string, contents: ReadonlyArray<TagState>) {
        super(id);
        this.contents = contents;
    }

    public createCopy(mutator?: (tag: TextBlockState) => void): TextBlockState {
        const copy = new TextBlockState(this.id, []);
        if(mutator) mutator(copy);
        return copy;
    }
}

