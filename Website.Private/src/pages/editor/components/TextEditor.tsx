import s from "../styles/TextEditor.module.scss";
import EditorBlock from "./EditorBlock.tsx";
import {useEditorPost} from "../hooks/useEditorPost.ts";

type Properties = {}
export default function TextEditor({}: Properties) {
    const post = useEditorPost("1");

    return <div className={s.textEditor}>
        {post && post.blocks.map(block => <EditorBlock key={block.id} blockItem={block}/>)}
    </div>
}