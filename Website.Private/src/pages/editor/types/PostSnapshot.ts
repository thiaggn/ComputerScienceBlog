import {CaretRecord} from "./CaretRecord.ts";
import {BlockState} from "./editor_elements/state/BlockState.ts";

export interface PostSnapshot {
    blocks: BlockState<unknown>[],
    caretPosition?: CaretRecord
}