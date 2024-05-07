import {EditorSelection} from "../types/EditorSelection.ts";
import {EditorCommand} from "../types/EditorCommand.ts";
import {processKeyboardCommand} from "../utils/processKeyboardCommand.ts";

export type TargetConfig = {
    inputCallback: (ev: Event) => void,
    id: any
}

type EditorListenerCallback = (data: any) => void;

export function createEditorListener() {
    const targets = new Map<object, TargetConfig>;
    let currentListener: EditorListenerCallback | undefined;
    let previousSelection: EditorSelection;
    let previousCommand: EditorCommand;

    // State management
    // ============================================================
    document.addEventListener('keydown', (ev) => {
        previousCommand = processKeyboardCommand(ev);
        if (previousCommand !== 0) console.log(EditorCommand[previousCommand]);
    })

    document.addEventListener('selectionchange', () => {
        previousSelection = new EditorSelection();
    });

    const handleInput = (ev: Event) => {

    }

    // Hook actions
    // =============================================================
    return {
        addBlockTarget: (element: HTMLElement, id: any) => {
            element.addEventListener('input', handleInput);
            targets.set(element, {
                inputCallback: handleInput,
                id: id
            });
        },

        removeBlockTarget: (element: HTMLElement) => {
            const el = targets.get(element);
            if (el) element.removeEventListener('input', el.inputCallback);
            targets.delete(element);
        },

        setListener: (callback: EditorListenerCallback) => {
            currentListener = callback
        },

        removeListener: () => {
            currentListener = undefined
        },
    }
}

export type EditorListenerActions = ReturnType<typeof createEditorListener>;
