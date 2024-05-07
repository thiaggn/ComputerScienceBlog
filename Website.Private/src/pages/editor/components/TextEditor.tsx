import {PostItem} from "../types/item/PostItem.ts";
import s from "../styles/TextEditor.module.scss";
import EditorBlock from "./EditorBlock.tsx";
import {useEditorListener} from "../hooks/useEditorListener.ts";
import {useEditorBlockTarget} from "../hooks/useEditorBlockTarget.ts";
import {
    EditorEventAction,
    EditorEventData,
    EditorUpdateEventData
} from "../contexts/editorListener/types/EditorEventData.ts";
import {useEffect, useState} from "react";
import {EditablePostProvider} from "../../../lib/providers/EditablePostProvider.ts";

type Properties = {}
export default function TextEditor({}: Properties) {
    const [post, setPost] = useState<PostItem>();

    useEffect(() => {
        const fetchPost = async () => {
            setPost(await EditablePostProvider.get("1"));
        }

        fetchPost();
    }, []);

    useEditorListener((events: EditorEventData[]) => {
        for (let event of events) {
            switch (event.action) {
                case EditorEventAction.Update:
                    setPost(prevPost => prevPost?.updateBlocks(event.block));
                    break;
            }
        }
    });

    return <div className={s.textEditor}>
        {post && post.blocks.map(block => <EditorBlock key={block.id} blockItem={block}/>)}
    </div>
}