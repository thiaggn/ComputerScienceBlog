import s from "./styles/EditorPage.module.scss"
import {useEffect, useState} from "react";
import {EditablePostItem} from "./types/PostTypes.ts";
import TextEditor from "./components/TextEditor.tsx";
import {EditablePostProvider} from "../../lib/providers/EditablePostProvider.ts";
import {createEditorListener} from "./contexts/createEditorListener.ts";
import {EditorListener} from "./contexts/EditorListener.ts";

const editorListener = createEditorListener();
export default function EditorPage() {

    const [post, setPost] = useState<EditablePostItem>();

    useEffect(() => {
        const fetchPost = async () => {
            setPost(await EditablePostProvider.get("1"));
        }

        fetchPost();
    }, []);

    return <div className={s.editorPage}>
        <EditorListener.Provider value={editorListener}>
            {post && <TextEditor post={post}/>}
        </EditorListener.Provider>
    </div>
}