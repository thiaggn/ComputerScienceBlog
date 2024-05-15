import {ContentState} from "../types/state/ContentState.ts";

declare global {
    export type TagStateRequest = {
        accept: (tagState: ContentState) => void;
    }

    export interface HTMLElementEventMap {
        "tagstate": CustomEvent<TagStateRequest>
    }
}
export function requestTagState(element: Element): Promise<ContentState> {
    return new Promise((resolve) => {
        element.dispatchEvent(new CustomEvent("tagstate", {
            detail: {
                accept: (state: ContentState) => resolve(state)
            }
        }))
    })
}