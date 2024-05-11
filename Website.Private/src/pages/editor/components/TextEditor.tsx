import s from "../styles/TextEditor.module.scss";
import BlockComponent from "./BlockComponent.tsx";
import { useRef} from "react";
import useEditor from "../hooks/useEditor.ts";
import {BlockState} from "../types/texteditor/BlockState.ts";

type Properties = {
    blocks: BlockState[]
}
export default function TextEditor({blocks}: Properties) {
    const elementRef = useRef<HTMLDivElement>(null);
    useEditor(elementRef, blocks);

    return <div ref={elementRef}  className={s.textEditor} contentEditable={true} suppressContentEditableWarning>
        {blocks && blocks.map(data => <BlockComponent key={data.id} blockState={data}/>)}
    </div>
}