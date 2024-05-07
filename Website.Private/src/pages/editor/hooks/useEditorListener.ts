import {useContext, useEffect} from "react";
import {EditorListener} from "../contexts/editorListener/EditorListener.ts";
import {EditorListenerCallback} from "../contexts/editorListener/createEditorListener.ts";

export function useEditorListener(onTextChangeCallback: EditorListenerCallback) {
    const context = useContext(EditorListener);
    if(context === undefined) throw new Error("UseEditorListener context was not properly initialized");

    useEffect(() => {
        context.setListener(onTextChangeCallback);
        return () => context.removeListener();
    }, []);
}

