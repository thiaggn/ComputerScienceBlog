import {useEffect, useRef} from "react";

type ListenerOptions = {
    inputCallback: (ev: Event) => void
}

export function createEditorListener() {
    const listeners = useRef(new Map<object, ListenerOptions>());

    useEffect(() => {
        const handleSelectionChange = () => {
            console.log("selection");
        }

        document.addEventListener('selectionchange', handleSelectionChange);

        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        }

    }, []);

    const handleListenerAdd = (element: HTMLElement) => {
        const handleInput = (ev: Event) => {
            console.log("input");
        }

        element.addEventListener('input', handleInput);
    }

    const handleListenerRemove = (element: HTMLElement) => {
        listeners.current.delete(element);
    }

    return {
        addListener: handleListenerAdd,
        removeListener: handleListenerRemove
    }
}