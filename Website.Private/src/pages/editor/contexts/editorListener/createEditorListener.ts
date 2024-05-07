import {EditorSelection} from "../../types/EditorSelection.ts";
import {EditorCommand} from "../../types/EditorCommand.ts";
import {processKeyboardCommandEvent} from "./processKeyboardCommandEvent.ts";
import {TagItem} from "../../types/item/TagItem.ts";
import {BlockItem} from "../../types/item/BlockItem.ts";
import {processEditorPasteEvent} from "./processEditorPasteEvent.ts";
import {EditorEventData} from "./types/EditorEventData.ts";
import {BlockTarget, TagTarget} from "./types/Targets.ts";
import processBlockInputEvent from "./processBlockInputEvent.ts";

export function createEditorListener() {
    const blockTargets = new Map<object, BlockTarget>;
    const tagTargets = new Map<object, TagTarget>;

    let currentListener: EditorListenerCallback | undefined;
    let lastSelection: EditorSelection;
    let lastCommand: EditorCommand;

    document.addEventListener('keydown', (ev) => {
        lastCommand = processKeyboardCommandEvent(ev);
    })

    document.addEventListener('selectionchange', () => {
        const currentSelection = document.getSelection();
        if(currentSelection) lastSelection = new EditorSelection(currentSelection);
    });

    document.addEventListener("paste", processEditorPasteEvent);


    return {
        setListener: (callback: EditorListenerCallback) => {
            currentListener = callback
        },

        removeListener: () => {
            currentListener = undefined
        },

        addBlockTarget: (element: Element, item: Readonly<BlockItem>) => {
            element.addEventListener('input', processBlockInputEvent);
            blockTargets.set(element, {
                item: item
            });
        },

        removeBlockTarget: (element: Element) => {
            const el = blockTargets.get(element);
            if (el) (element as HTMLElement).removeEventListener('input', processBlockInputEvent);
            blockTargets.delete(element);
        },

        addTagTarget: (element: Element, item: Readonly<TagItem>) => {
            tagTargets.set(element, {
                item: item
            });
        },

        removeTagTarget: (element: Element) => {
            tagTargets.delete(element);
        }
    }
}

export type EditorListenerCallback = (data: EditorEventData) => void;
export type EditorListenerActions = ReturnType<typeof createEditorListener>;
