import s from "./styles/EditorPage.module.scss"
import TextEditor from "./components/TextEditor.tsx";
import {usePostBlocks} from "./PostStore.ts";
import {useEffect} from "react";
import {PostDataProvider} from "../../lib/providers/PostDataProvider.ts";

export default function EditorPage() {
    const {blocks, setBlocks} = usePostBlocks();

    useEffect(() => {
        const fetchData = async () => {
            const data = await PostDataProvider.get("");
            setBlocks(data.blocks);
        }

        fetchData();
    }, []);

    return <div className={s.editorPage}>
        {blocks && <TextEditor blocks={blocks}/>}
    </div>
}