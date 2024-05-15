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
export interface ContentState {
    readonly id: string;
    readonly type: TagType;
    readonly content: string;
    readonly parentId: string;
}

export interface TextTagState extends ContentState {
    readonly type: TagType.Text;
    readonly styles: TagStyle[];
    readonly color: TagColor;
}

export interface CodeTagState extends ContentState {
    readonly type: TagType.Code;
    readonly color: TagColor;
    readonly background: TagBackground;
}

export interface LinkTagState extends ContentState {
    readonly type: TagType.Link;
    readonly color: string;
    readonly background: string;
    readonly url: string;
}
