import {EditablePostItem} from "../types/PostTypes.ts";
import s from "../styles/TextEditor.module.scss";
import EditorBlock from "./EditorBlock.tsx";
import {useEditorListener, useEditorTarget} from "../contexts/EditorListener.ts";

type Properties = {
    post: EditablePostItem;
}
export default function TextEditor({post}: Properties) {

    useEditorListener((data: any) => {
        console.log("Houve alguma alteração nos posts.", data);
    });

    return <div className={s.textEditor}>
        {post.blocks.map(block => <EditorBlock key={block.id} blockItem={block}/>)}
    </div>
}