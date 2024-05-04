import s from "../styles/EditorLayout.module.scss";
import {useEffect, useRef, FormEvent} from "react";
import {PostEditableDataPlaceholder} from "../lib/placeholders/PostEditableDataPlaceholder.ts";
import {EditorEvent} from "../lib/EditorEvent.ts";
import {BlockData, TagData, TagType} from "../lib/types/EditorTypes.ts";

const options = {
    contentEditable: true,
    suppressContentEditableWarning: true
}
export default function EditorLayout() {


    return <div className={s.editor}>
        <div className={s.textarea}>
            {PostEditableDataPlaceholder.blocks.map((block, key) => {
                return <Block block={block} key={key}/>
            })}
        </div>
    </div>
}

function Block({block}: {block: BlockData}) {
    const handleInput = (ev: FormEvent<HTMLDivElement>) => {
        const selection = window.getSelection();


        if (selection) {
            const range = selection.getRangeAt(0);
            const target = range.startContainer.parentNode;


            target?.dispatchEvent(
                EditorEvent.create("tagInput", {
                    value: target.textContent || ""
                })
            )
        }
    }

    return <div onInput={handleInput} className={s.block} {...options}>
        {block.tags.map((tag, key) => <Tag key={key} tag={tag}/>)}
    </div>
}

function Tag({tag}: { tag: TagData }) {

    const elementRef = useRef<any>();

    const handleTagChange = (data: CustomEvent<{value: string}>) => {

    }

    useEffect(() => {
        const element = elementRef.current as HTMLElement;

        element.addEventListener("tagInput", handleTagChange);

        return () => {
            element.removeEventListener("tagInput", handleTagChange)
        }

    }, []);

    switch (tag.type) {
        case TagType.Text:
            return <div ref={elementRef} className={s.text}>{tag.content}</div>

        case TagType.Code:
            return <code ref={elementRef} className={s.code}>{tag.content}</code>
    }
}