import {BlockItem, BlockType, editableDivConfig} from "../types/BlockTypes.ts";
import s from "../styles/TextEditor.module.scss";
import EditorTag from "./EditorTag.tsx";
import {useCallback, useRef} from "react";

type Properties = {
    blockItem: BlockItem;
}
export default function EditorBlock({blockItem}: Properties) {

    const handleInput = useCallback(() => {
        console.log('input')

    }, []);

    switch (blockItem.type) {
        case BlockType.Text:

            return <div id={blockItem.id} className={s.block} onInput={handleInput}  {...editableDivConfig}>
                {blockItem.tags.map(tagItem => <EditorTag key={tagItem.id} tagItem={tagItem}/>)}
            </div>
    }
}