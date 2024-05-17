import {TagState} from "../types/state/TagState.ts";
import {BlockState} from "../types/state/BlockState.ts";

type EditorStateRequest<T> = {
    accept: (state: T) => void
}

export type TagStateRequest = EditorStateRequest<TagState>;
export type BlockStateRequest = EditorStateRequest<BlockState>;

declare global {
    export interface HTMLElementEventMap {
        "tagstaterequest": CustomEvent<TagStateRequest>;
        "blockstaterequest": CustomEvent<BlockStateRequest>;
    }
}


