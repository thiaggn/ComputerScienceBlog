import {MutableRefObject, useContext, useEffect} from "react";
import {TagItem} from "../types/item/TagItem.ts";
import {EditorListener} from "../contexts/editorListener/EditorListener.ts";

export default function useEditorTagTarget(elementRef: MutableRefObject<any>, tagItem: TagItem) {
    const context = useContext(EditorListener);

    useEffect(() => {
        const element = elementRef.current;
        if (context === undefined) throw new Error("UseEditorListener context was not properly initialized");
        if (element === undefined) throw new Error("Tag element ref can't be undefined!");

        element.setAttribute("editorListener-item", [tagItem.role, tagItem.type].join("."));
        context.addTagTarget(element, tagItem);

        return () => {
            context.removeTagTarget(element)
        };

    }, [tagItem]);
}