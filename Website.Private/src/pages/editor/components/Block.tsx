// Block Component
// ================================================
import {BlockItem, TagItem} from "../types/EditorTypes.ts";
import {FormEvent} from "react";
import s from "../../../styles/EditorLayout.module.scss";

import {Tag} from "./Tag.tsx";
import {BlockUpdateAction, BlockUpdateData} from "../types/BlockUpdateData.ts";

const options = {
    contentEditable: true,
    suppressContentEditableWarning: true
}

type Properties = {
    block: BlockItem,
    onUpdate: (updates: BlockUpdateData[]) => void
}
export function Block({block, onUpdate}: Properties) {
    const handleInput = (ev: FormEvent<HTMLDivElement>)=> {
        const selection = window.getSelection() as Selection;

        const isWithinSameTag = selection.focusNode === selection.anchorNode;

        if(isWithinSameTag) {
            const tagId = selection?.focusNode?.parentElement?.getAttribute("editor-tag-id");

            if(!tagId) throw new Error(
                `Editor block "${block.id}" couldn't update. The "editor-tag-id" attribute/value is missing or is not valid.`
            );

            const tagItem = block.tags.find((tag: TagItem) => tag.id === tagId );

            if(!tagItem) throw new Error(
                `Editor block "${block.id}" couldn't update. Tried to update tag with id ${tagId}, but it doesn't exist.`
            );

            tagItem.content = (selection!.focusNode!.parentElement as HTMLElement).innerText;

            const newBlock = {
                action: BlockUpdateAction.Set,
                block: {...block}
            };


            onUpdate([newBlock]);
        }
    }

    return <div editor-block-id={block.id} onInput={handleInput} className={s.block} {...options}>
        {block.tags.map((tag: TagItem) => <Tag key={tag.id} tag={tag}/>)}
    </div>
}