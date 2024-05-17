import { TagBackground, TagColor, TagState, TagType} from "../TagState.ts";
import {Mutable} from "../../Mutable.ts";
import {ContentNeighbor, ContentState} from "../ContentState.ts";

export class CodeTagState extends TagState {
    type: TagType.Code = TagType.Code;
    color: TagColor;
    background: TagBackground;

    constructor(id: string, content: string, color: TagColor, background: TagBackground) {
        super(id, content);
        this.color = color;
        this.background = background;
    }

    createCopy(mutator?: (tag: CodeTagState) => void): CodeTagState {
        const copy = new CodeTagState(this.id, this.content, this.color, this.background);
        if(mutator) mutator(copy);
        return copy;
    }
}