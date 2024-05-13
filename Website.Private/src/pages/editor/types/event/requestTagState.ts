import {TagState} from "../data/TagState.ts";

declare global {
    export type TagStateRequest = {
        accept: (tagState: TagState) => void;
    }

    export interface HTMLElementEventMap {
        "tagstate": CustomEvent<TagStateRequest>
    }
}
export function requestTagState(element: Element): Promise<TagState> {
    return new Promise((resolve) => {
        element.dispatchEvent(new CustomEvent("tagstate", {
            detail: {
                accept: (state: TagState) => resolve(state)
            }
        }))
    })
}