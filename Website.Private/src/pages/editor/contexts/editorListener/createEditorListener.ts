import {EditorCommand} from "../../types/EditorCommand.ts";
import {processKeyboardCommandEvent} from "./processKeyboardCommandEvent.ts";
import {TagItem} from "../../types/item/TagItem.ts";
import {BlockItem} from "../../types/item/BlockItem.ts";
import {processEditorPasteEvent} from "./processEditorPasteEvent.ts";
import {EditorEventData} from "./types/EditorEventData.ts";
import {BlockTarget, TagTarget} from "./types/Targets.ts";
import processBlockInputEvent from "./processBlockInputEvent.ts";
import {CaretMoveCommand} from "./CaretMoveCommand.ts";

export function createEditorListener() {
    const blockTargets = new Map<object, BlockTarget>;
    const tagTargets = new Map<object, TagTarget>;
    let dispatchUpdates: EditorListenerCallback | undefined;
    let caretMoveCommand: CaretMoveCommand
    const onAnyBlockInput = (ev: Event) => {
        if(dispatchUpdates != undefined) {
            const {updates, command} = processBlockInputEvent(ev, tagTargets, blockTargets);
            caretMoveCommand = command;
            dispatchUpdates(updates);
        }
    };

    document.addEventListener("paste", processEditorPasteEvent);


    return {
        getCaretMoveCommand: () => caretMoveCommand,

        setListener: (callback: EditorListenerCallback) => {
            dispatchUpdates = callback
        },

        removeListener: () => {
            dispatchUpdates = undefined
        },

        addBlockTarget: (element: Element, item: Readonly<BlockItem>) => {
            element.addEventListener('input', onAnyBlockInput);
            blockTargets.set(element, {
                item: item
            });
        },

        removeBlockTarget: (element: Element) => {
            const el = blockTargets.get(element);
            if (el) (element as HTMLElement).removeEventListener('input', onAnyBlockInput);
            blockTargets.delete(element);
        },

        addTagTarget: (element: Element, item: Readonly<TagItem>) => {
            tagTargets.set(element, {
                item: item
            });
        },

        removeTagTarget: (element: Element) => {
            const existed = tagTargets.delete(element);
        }
    }
}

export type EditorListenerCallback = (data: EditorEventData[]) => void;
export type EditorListenerActions = ReturnType<typeof createEditorListener>;
