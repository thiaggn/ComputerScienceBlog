import {BlockState} from "./BlockState.ts";
import {TagState} from "./TagState.ts";
import {CaretRecord} from "../../CaretRecord.ts";
import {PostSnapshot} from "../../PostSnapshot.ts";

export interface PostState {
    id: string;
    title: string;
    blocks: BlockState<unknown>[];
}


