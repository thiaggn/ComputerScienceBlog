import s from "../styles/TextEditor.module.scss";
import TextBlock from "./TextBlock.tsx";
import {useRef} from "react";
import useEditor from "../hooks/useEditor.ts";
import {BlockState, BlockType, TextBlockState} from "../types/state/BlockState.ts";
import {exclusiveMap} from "../../../utils/exclusiveMap.ts";

type Properties = {
    blocks: BlockState[]
}
export default function Editor({blocks}: Properties) {
    const elementRef = useRef<HTMLDivElement>(null);
    useEditor(elementRef, blocks);

    return <div
        ref={elementRef}
        className={s.textEditor}
        text-editor=""
        contentEditable={true}
        suppressContentEditableWarning
    >
        {blocks && exclusiveMap(blocks, (block: BlockState) => {
            switch (block.type) {
                case BlockType.Text:
                    return <TextBlock key={block.id} blockState={block as TextBlockState}/>
            }
        })}
    </div>
}
