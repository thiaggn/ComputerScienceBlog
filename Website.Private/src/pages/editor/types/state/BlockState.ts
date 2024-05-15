import {CodeTagState, LinkTagState, ContentState, TextTagState} from "./ContentState.ts";

export enum BlockType {
    Text,
    Table,
    Image,
    Code
}

export interface BlockState {
    readonly type: BlockType;
    readonly id: string;
    readonly contents: ReadonlyArray<object>;
}

export interface TextBlockState extends BlockState {
    readonly type: BlockType.Text;
    readonly contents: ReadonlyArray<TextTagState | CodeTagState | LinkTagState>;
}

export interface TableBlockState extends BlockState {
    readonly type: BlockType.Table;
}

export interface ImageBlockState extends BlockState {
    readonly type: BlockType.Image;
}

export interface CodeBlockState extends BlockState {
    readonly type: BlockType.Code;
}

