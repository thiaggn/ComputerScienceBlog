import {BlockItem, BlockType, editableDivConfig} from "../types/BlockTypes.ts";
import s from "../styles/TextEditor.module.scss";
import EditorTag from "./EditorTag.tsx";
import {useCallback, useEffect, useRef} from "react";
import {useEditorListener} from "../hooks/useEditorListener.ts";
import {useEditorBlockTarget} from "../hooks/useEditorBlockTarget.ts";

type Properties = {
    blockItem: BlockItem;
}
export default function EditorBlock({blockItem}: Properties) {

    const tagElement = useRef<any>();
    useEditorBlockTarget(tagElement, blockItem.id);

    switch (blockItem.type) {
        case BlockType.Text:
            return <div ref={tagElement} id={blockItem.id} className={s.block}  {...editableDivConfig}>
                {blockItem.tags.map(tagItem => <EditorTag key={tagItem.id} tagItem={tagItem}/>)}
            </div>
    }
}