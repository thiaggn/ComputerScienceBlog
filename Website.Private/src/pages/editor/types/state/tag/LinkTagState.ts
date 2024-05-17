import { TagBackground, TagColor, TagState, TagType} from "../TagState.ts";
import {Mutable} from "../../Mutable.ts";
import {ContentNeighbor, ContentState} from "../ContentState.ts";
export class LinkTagState extends TagState {
    type: TagType.Link = TagType.Link;
    color: TagColor;
    background: TagBackground;
    url: string;

    constructor(
        id: string, content: string, url: string,
        color: TagColor, background: TagBackground,
    ) {
        super(id, content);
        this.color = color;
        this.background = background;
        this.url = url;
    }

    createCopy(mutator?: (tag: LinkTagState) => void): LinkTagState {
        const copy = new LinkTagState(
            this.id, this.url, this.content, this.color, this.background
        );
        if(mutator) mutator(copy);
        return copy;
    }
}