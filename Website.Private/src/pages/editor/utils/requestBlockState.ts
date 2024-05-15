import {BlockState, BlockType, TextBlockState} from "../types/state/BlockState.ts";

declare global {
    export type BlockStateRequest = {
        accept: (blockState: BlockState) => void;
    }

    export interface HTMLElementEventMap {
        "blockstate": CustomEvent<BlockStateRequest>
    }
}

export function requestBlockState(element: Element): Promise<BlockState> {
    return new Promise((resolve) => {
        element.dispatchEvent(new CustomEvent("blockstate", {
            detail: {
                accept: (state: BlockState) => {
                    resolve(state as BlockState)
                }
            }
        }))
    })
}
