import {BlockState} from "./BlockState.ts";

export interface PostState {
    id: string;
    title: string;
    blocks: BlockState[]
}


