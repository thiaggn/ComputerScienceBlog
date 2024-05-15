import s from "./styles/EditorPage.module.scss"
import Editor from "./components/Editor.tsx";
import {useEffect} from "react";
import {PostDataProvider} from "../../lib/providers/PostDataProvider.ts";
import {usePostStore} from "../../store/postStore.ts";

export default function EditorPage() {

    const {setPost, blocks} = usePostStore((state) => ({
        setPost: state.initializePost,
        blocks: state.blocks
    }));

    useEffect(() => {
        const fetchPost = async () => {
            const postState = await PostDataProvider.get("");
            setPost(postState);
        }
        fetchPost();

    }, []);

    return <div className={s.editorPage}>
        <Editor blocks={blocks}/>
    </div>
}