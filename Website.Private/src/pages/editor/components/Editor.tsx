import s from "../styles/TextEditor.module.scss";
import TextBlock from "./TextBlock.tsx";
import {useRef} from "react";
import useEditor from "../hooks/useEditor.ts";
import {BlockState, BlockType} from "../types/data/BlockState.ts";
import {exclusiveMap} from "../../../utils/exclusiveMap.ts";
import {TagState} from "../types/data/TagState.ts";

type Properties = {
    blocks: BlockState<unknown>[]
}
export default function Editor({blocks}: Properties) {
    const elementRef = useRef<HTMLDivElement>(null);
    useEditor(elementRef, blocks);

    return <div ref={elementRef}  className={s.textEditor} text-editor="" contentEditable={true} suppressContentEditableWarning>
        {blocks && exclusiveMap(blocks, (block: BlockState<unknown>) => {
            switch (block.type) {
                case BlockType.Text:
                    return <TextBlock key={block.id} blockState={block as BlockState<TagState>}/>
            }
        })}
    </div>
}
