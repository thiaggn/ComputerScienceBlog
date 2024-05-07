import {EditablePostItem} from "../types/PostTypes.ts";
import s from "../styles/TextEditor.module.scss";
import EditorBlock from "./EditorBlock.tsx";
import {useEditorListener} from "../hooks/useEditorListener.ts";
import {useEditorBlockTarget} from "../hooks/useEditorBlockTarget.ts";

type Properties = {
    post: EditablePostItem;
}
export default function TextEditor({post}: Properties) {

    useEditorListener((data: any) => {

    });

    return <div className={s.textEditor}>
        {post.blocks.map(block => <EditorBlock key={block.id} blockItem={block}/>)}
    </div>
}