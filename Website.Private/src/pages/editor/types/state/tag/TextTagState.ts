import {TagStyle, TagColor, TagType, TagState} from "../TagState.ts";
import {Mutable} from "../../Mutable.ts";
import {ContentNeighbor, ContentState} from "../ContentState.ts";

export class TextTagState extends TagState {
    type: TagType.Text = TagType.Text;
    styles: ReadonlyArray<TagStyle>;
    color: TagColor;

    constructor(id: string, content: string,  styles: ReadonlyArray<TagStyle>, color: TagColor) {
        super(id, content);
        this.styles = styles;
        this.color = color;
    }

    createCopy(mutator?: (tag: TextTagState) => void): TextTagState {
        const copy = new TextTagState(
            this.id, this.content, [...this.styles], this.color
        );
        if(mutator) mutator(copy);
        return copy;
    }
}