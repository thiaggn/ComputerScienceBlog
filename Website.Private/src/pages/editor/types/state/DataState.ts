import {CodeTagState, LinkTagState, ContentState, TextTagState} from "./ContentState.ts";
import {CodeBlockState, TextBlockState} from "./BlockState.ts";

type TagStateTypes = TextTagState | CodeTagState | LinkTagState;
type BlockStateTypes = TextBlockState | CodeBlockState;

type ApiData<T> = T extends ContentState
    ? Omit<T, "id" | "parentId">
    : Omit<T, "id" | "contents"> & {contents: ApiData<TagStateTypes>[]}


export type PostAPIData = ApiData<BlockStateTypes>[];