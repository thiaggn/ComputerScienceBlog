import {BlockState} from "../types/state/BlockState.ts";
import {BlockStateRequest} from "./EditorStateRequest.ts";

export function requestBlockState(element: Element) {

    if (!element.hasAttribute("editor-block")) throw new Error("Element is not a block element");

    return new Promise<BlockState>((resolve, reject) => {

        const timeOut = setTimeout(() => {
            reject("Block element didn't respond");
        }, 100);

        element.dispatchEvent(new CustomEvent<BlockStateRequest>("blockstaterequest", {
            detail: {
                accept: (state: BlockState) => {
                    clearTimeout(timeOut);
                    resolve(state)
                }
            }
        }))
    })
}