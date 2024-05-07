type TargetConfig = {
    inputCallback: (ev: Event) => void
}

type EditorListenerCallback = (data: any) => void;

export function createEditorListener() {
    const targets = new Map<object, TargetConfig>;
    let currentListener: EditorListenerCallback | undefined;
    const handleSelectionChange = () => {
        console.log("selection");

    }

    document.addEventListener('selectionchange', handleSelectionChange);
    const addTarget = (element: HTMLElement) => {
        const handleInput = (ev: Event) => {
            if(currentListener) currentListener("oi");
        }

        element.addEventListener('input', handleInput);
        targets.set(element, {
            inputCallback: handleInput
        });
    }

    const removeTarget = (element: HTMLElement) => {
        const el = targets.get(element);

        if(el) {
            element.removeEventListener('input', el.inputCallback);
        }

        targets.delete(element);
    }

    const setListener = (callback: EditorListenerCallback) => {
        currentListener = callback;
    }

    const removeListener = () => {
        currentListener = undefined;
    }

    return {
        addTarget: addTarget,
        removeTarget: removeTarget,
        setListener: setListener,
        removeListener: removeListener,
    }
}

export type EditorListenerActions = ReturnType<typeof createEditorListener>;
