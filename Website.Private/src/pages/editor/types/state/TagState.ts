import {ContentNeighbor, ContentState} from "./ContentState.ts";
import {Mutable} from "../Mutable.ts";


export abstract class TagState extends ContentState {
    abstract type: TagType;
    content: string;
    empty: boolean = false;

    protected constructor(id: string, content: string) {
        super(id);
        this.content = content;
    }

    public abstract createCopy(mutator?: (tag: TagState) => void): TagState;
}

export enum TagType {
    Text,
    Code,
    Link
}
export enum TagStyle {
    Default,
    Italic,
    Bold,
}

export enum TagColor {
    Default,
    Gray
}

export enum TagBackground {
    Default,
    Gray
}