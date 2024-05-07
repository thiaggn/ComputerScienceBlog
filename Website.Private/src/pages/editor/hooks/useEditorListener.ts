import {createContext, useContext, useEffect} from "react";
import {EditorListenerActions} from "../contexts/createEditorListener.ts";

export const UseEditorListener = createContext<EditorListenerActions | undefined>(undefined);

export function useEditorListener(onTextChangeCallback: (data: any) => void) {
    const context = useContext(UseEditorListener);
    if(context === undefined) throw new Error("UseEditorListener context was not properly initialized");

    useEffect(() => {
        context.setListener(onTextChangeCallback);

        return () => context.removeListener();
    }, []);

}

