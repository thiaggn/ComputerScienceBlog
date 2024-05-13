import {CaretSnapshot} from "./CaretSnapshot.ts";
import {BlockState} from "./data/BlockState.ts";
export interface PostSnapshot {
    blocks: BlockState<unknown>[],
    caretPosition?: CaretSnapshot
}