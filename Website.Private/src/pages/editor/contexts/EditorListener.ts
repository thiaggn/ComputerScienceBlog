import {createContext, MutableRefObject, useContext, useEffect} from "react";
import {EditorListenerActions} from "./createEditorListener.ts";

export const EditorListener = createContext<EditorListenerActions | undefined>(undefined);


export function useEditorListener(onTextChangeCallback: (data: any) => void) {
    const context = useContext(EditorListener);
    if(context === undefined) throw new Error("EditorListener context was not properly initialized");

    useEffect(() => {
        context.setListener(onTextChangeCallback);

        return () => context.removeListener();
    }, []);

}

type EditorTargetActions = Pick<EditorListenerActions, "addTarget" | "removeTarget">;

export function useEditorTarget(elementRef: MutableRefObject<any>) {
    const context = useContext(EditorListener);
    if(context === undefined) throw new Error("EditorListener context was not properly initialized");


    useEffect(() => {
        const element = elementRef.current as HTMLDivElement;

        context.addTarget(element);

        return () => {
            context.removeTarget(element);
        }
    }, []);

}

