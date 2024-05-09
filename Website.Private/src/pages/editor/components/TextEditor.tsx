import s from "../styles/TextEditor.module.scss";
import BlockComponent from "./BlockComponent.tsx";
import {BlockState} from "../types/state/BlockState.ts";
import {usePostStore} from "../../../store/postStore.ts";
import {PostState} from "../types/state/PostState.ts";
import {useEffect} from "react";
import {EditablePostProvider} from "../../../lib/providers/EditablePostProvider.ts";
import {SelectionObserver} from "../misc/SelectionObserver.ts";

export default function TextEditor() {
    const {blocks, setPost, offset} = usePostStore((state: PostState) => ({
        blocks: state.blocks,
        setPost: state.setPost,
        offset: state.offset
    }));

    useEffect(() => {
        const fetchPost = async () => {
            setPost(await EditablePostProvider.get(""))
        }
        fetchPost();
    }, []);

    const handleInput = () => {
        const selection = document.getSelection();
        const lastSelection = SelectionObserver.lastSelection;

        if(selection && lastSelection) {
            const {focusNode, focusOffset, anchorNode, anchorOffset} = lastSelection;
            if(offset == 0.5)selection.setPosition(anchorNode, anchorOffset);
            else if(offset == -0.5) selection.setPosition(focusNode, focusOffset);
            else selection.setPosition(focusNode, focusOffset + offset);
        }
    }

    return <div onInput={handleInput} className={s.textEditor} contentEditable={true} suppressContentEditableWarning>
        {blocks && blocks.map(data => <BlockComponent key={data.id} blockState={data}/>)}
    </div>
}