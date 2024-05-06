import s from "./styles/EditorPage.module.scss"
import {useEffect, useState} from "react";
import {EditablePostItem} from "./types/PostTypes.ts";
import PostEditor from "./components/PostEditor.tsx";
import {EditablePostProvider} from "../../lib/providers/EditablePostProvider.ts";

export default function EditorPage() {

    const [post, setPost] = useState<EditablePostItem>();

    useEffect(() => {
        const fetchPost = async () => {
            setPost(await EditablePostProvider.get("1"));
        }

        fetchPost();
    }, []);

    return <div className={s.editorPage}>
        {post && <PostEditor post={post}/>}
    </div>
}