import {useContext, useEffect} from "react";
import {EditorListener} from "../contexts/editorListener/createEditorListener.ts";
import {EditorListener} from "../contexts/editorListener/EditorListener.ts";
export function useEditorListener(onTextChangeCallback: (data: any) => void) {
    const context = useContext(EditorListener);
    if(context === undefined) throw new Error("UseEditorListener context was not properly initialized");

    useEffect(() => {
        context.setListener(onTextChangeCallback);
        return () => context.removeListener();
    }, []);

}

