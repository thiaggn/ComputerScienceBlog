import {EditablePostItem} from "../types/PostTypes.ts";
import s from "../styles/TextEditor.module.scss";
import EditorBlock from "./EditorBlock.tsx";
import {useEffect} from "react";
import {createEditorListener} from "../hooks/createEditorListener.ts";

type Properties = {
    post: EditablePostItem;
}

export const editorEvents = createEditorListener();
export default function TextEditor({post}: Properties) {


    return <div className={s.textEditor}>
        {post.blocks.map(block => <EditorBlock key={block.id} blockItem={block}/>)}
    </div>
}