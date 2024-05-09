import s from "../styles/TextEditor.module.scss";
import BlockComponent from "./BlockComponent.tsx";
import {BlockState} from "../types/state/BlockState.ts";
import {usePostStore} from "../../../store/postStore.ts";
import {PostState} from "../types/state/PostState.ts";
import {useEffect} from "react";
import {EditablePostProvider} from "../../../lib/providers/EditablePostProvider.ts";
import {SelectionObserver} from "../misc/SelectionObserver.ts";

export default function TextEditor() {
    const {blocks, setPost, caretPosition} = usePostStore((state: PostState) => ({
        blocks: state.blocks,
        setPost: state.setPost,
        caretPosition: state.caretPosition
    }));

    useEffect(() => {
        const fetchPost = async () => {
            setPost(await EditablePostProvider.get(""))
        }
        fetchPost();
    }, []);

    const handleInput = () => {
        console.log(SelectionObserver.lastSelection);
        const selection = document.getSelection();
        if(caretPosition && selection) {
            selection.setPosition(caretPosition.node, caretPosition.offset);
        }
    }

    return <div onInput={handleInput} className={s.textEditor} contentEditable={true} suppressContentEditableWarning>
        {blocks && blocks.map(data => <BlockComponent key={data.id} blockState={data}/>)}
    </div>
}