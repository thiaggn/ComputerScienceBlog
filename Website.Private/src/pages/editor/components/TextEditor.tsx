import s from "../styles/TextEditor.module.scss";
import BlockComponent from "./BlockComponent.tsx";
import {BlockState} from "../types/state/BlockState.ts";
import {usePostStore} from "../../../store/postStore.ts";
import {PostState} from "../types/state/PostState.ts";
import {useEffect} from "react";
import {EditablePostProvider} from "../../../lib/providers/EditablePostProvider.ts";

export default function TextEditor() {
    const {blocks, setPost} = usePostStore((state: PostState) => ({
        blocks: state.blocks,
        setPost: state.setPost
    }));

    useEffect(() => {
        const fetchPost = async () => {
            setPost(await EditablePostProvider.get(""))
        }

        fetchPost();
    }, []);

    return <div className={s.textEditor} contentEditable={true} suppressContentEditableWarning>
        {blocks && blocks.map(data => <BlockComponent key={data.id} blockState={data}/>)}
    </div>
}