import {TagState} from "../types/state/TagState.ts";
import {TagStateRequest} from "./EditorStateRequest.ts";

export async function requestTagState(element: Element) {
    if (!element.hasAttribute("editor-tag")) throw new Error("Element is not a tag element");

    return new Promise<TagState>((resolve, reject) => {

        const timeOut = setTimeout(() => {
            reject("Tag element didn't respond");
        }, 100);

        element.dispatchEvent(new CustomEvent<TagStateRequest>("tagstaterequest", {
            detail: {
                accept: (state: TagState) => {
                    clearTimeout(timeOut);
                    resolve(state)
                }
            }
        }))
    })
}