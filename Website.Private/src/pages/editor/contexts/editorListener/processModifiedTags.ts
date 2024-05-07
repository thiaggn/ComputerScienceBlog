import {TagItem} from "../../types/item/TagItem.ts";
import {EditorSelection} from "../../types/EditorSelection.ts";
import {EditorCommand} from "../../types/EditorCommand.ts";

export type TagUpdate = {
    element: Node,
    state?: TagItem,
    newContent: string,
}

export const TagStateRequestEventName = "tsqev";

export type TagStateRequestEventData = (value: PromiseLike<TagItem> | TagItem) => void;
async function processModifiedTag(selection: EditorSelection, element: HTMLElement | null) {
    if (element === null) throw new Error("Can't update undefined element.");

    const tagState: TagItem = await new Promise<TagItem>((resolve) => {
        const tagStateRequestEvent = new CustomEvent<TagStateRequestEventData>(TagStateRequestEventName, {
            detail: resolve
        })

        element.dispatchEvent(tagStateRequestEvent);
    });

    return {
        element: selection.focusNode,
        newContent: element.innerText,
        state: tagState
    }
}

export default async function processModifiedTags(selection: EditorSelection, command: EditorCommand) {
    const updates: TagUpdate[] = [];
    const anchor = selection.anchorNode.parentElement;
    const focus = selection.focusNode.parentElement;

    // As vezes collapsed nao significa muito... Analisar melhor!
    if (selection.isCollapsed && command === EditorCommand.None) {
        return [await processModifiedTag(selection, focus)];
    }
}