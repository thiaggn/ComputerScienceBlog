import {CaretPositionRecord} from "./CaretPositionRecord.ts";
import {BlockState} from "./texteditor/BlockState.ts";

export interface PostSnapshot {
    blocks: BlockState[],
    caretPosition?: CaretPositionRecord
}