import {MutableRefObject, useContext, useEffect} from "react";
import {UseEditorListener} from "./useEditorListener.ts";

export function useEditorBlockTarget(elementRef: MutableRefObject<any>, id: any) {
    const context = useContext(UseEditorListener);
    if (context === undefined) throw new Error("UseEditorListener context was not properly initialized");


    useEffect(() => {
        const element = elementRef.current as HTMLDivElement;

        context.addBlockTarget(element, id);

        return () => {
            context.removeBlockTarget(element);
        }
    }, []);

}