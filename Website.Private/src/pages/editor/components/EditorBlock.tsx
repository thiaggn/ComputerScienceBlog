import {BlockItem, BlockType, editableDivConfig} from "../types/item/BlockItem.ts";
import s from "../styles/TextEditor.module.scss";
import EditorTag from "./EditorTag.tsx";
import {useCallback, useEffect, useRef} from "react";
import {useEditorListener} from "../hooks/useEditorListener.ts";
import {useEditorBlockTarget} from "../hooks/useEditorBlockTarget.ts";
import {join} from "../../../lib/utils/join.ts";

type Properties = {
    blockItem: BlockItem;
}
export default function EditorBlock({blockItem}: Properties) {

    const tagElement = useRef<any>();
    useEditorBlockTarget(tagElement, blockItem);

    switch (blockItem.type) {
        case BlockType.Text:
            return <div
                ref={tagElement}
                className={s.block}
                {...editableDivConfig}
            >
                {blockItem.tags.map(tagItem => <EditorTag key={tagItem.id} tagItem={tagItem}/>)}
            </div>
    }
}