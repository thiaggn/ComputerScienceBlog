import {MutableRefObject, useContext, useEffect} from "react";
import {BlockItem} from "../types/item/BlockItem.ts";
import {EditorListener} from "../contexts/editorListener/EditorListener.ts";


export function useEditorBlockTarget(elementRef: MutableRefObject<any>, blockItem: Readonly<BlockItem>) {
    const context = useContext(EditorListener);

    useEffect(() => {
        const element = elementRef.current as Element;
        if (context === undefined) throw new Error("UseEditorListener context was not properly initialized");
        if(element === undefined) throw new Error("Block element ref can't be undefined!");

        element.setAttribute("editorListener-item", [blockItem.role, blockItem.type].join("."));
        context.addBlockTarget(element, blockItem);
        return () => context.removeBlockTarget(element);
    }, []);

}