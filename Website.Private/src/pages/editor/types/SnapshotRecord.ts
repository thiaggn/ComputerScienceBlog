import {BlockState} from "./state/BlockState.ts";

import {SelectionFormat} from "./caret/SelectionFormat.ts";

export interface SnapshotRecord {
    blocks?: BlockState[];
    focusedTagId?: string
    offset?: number
    selectionMode: SelectionFormat
}