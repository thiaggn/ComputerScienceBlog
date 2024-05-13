import {BlockState} from "../data/BlockState.ts";

declare global {
    export type BlockStateRequest = {
        accept: (blockState: BlockState<unknown>) => void;
    }

    export interface HTMLElementEventMap {
        "blockstate": CustomEvent<BlockStateRequest>
    }
}
export function requestBlockState<T>(element: Element): Promise<BlockState<T>> {
    return new Promise((resolve) => {
        element.dispatchEvent(new CustomEvent("blockstate", {
            detail: {
                accept: (state: BlockState<T>) => resolve(state)
            }
        }))
    })
}