import s from "./styles/EditorPage.module.scss"
import TextEditor from "./components/TextEditor.tsx";
import {useEffect} from "react";
import {EditablePostProvider} from "../../lib/providers/EditablePostProvider.ts";
import {usePostStore} from "../../store/postStore.ts";

export default function EditorPage() {

    const {setPost, blocks} = usePostStore((state) => ({
        setPost: state.setPost,
        blocks: state.blocks
    }));

    useEffect(() => {
        const fetchPost = async () => {
            setPost(await EditablePostProvider.get(""))
        }
        fetchPost();

    }, []);

    return <div className={s.editorPage}>
        <TextEditor blocks={blocks}/>
    </div>
}