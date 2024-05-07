import {TagItem, TagType} from "../types/item/TagItem.ts";
import s from "../styles/TextEditor.module.scss";
import {join} from "../../../lib/utils/join.ts";
import useEditorTagTarget from "../hooks/useEditorTagTarget.ts";
import {useRef} from "react";

type Properties = {
    tagItem: TagItem
}

const tagStyleMap: Record<TagType, string> = {
    [TagType.Text]: s.text,
    [TagType.Code]: s.code,
    [TagType.Bold]: s.bold,
    [TagType.Italic]: s.italic
}

export default function EditorTag({tagItem}: Properties) {
    const tagElementRef = useRef<any>();
    useEditorTagTarget(tagElementRef, tagItem);

    return <div
        ref={tagElementRef}
        key={tagItem.id}
        id={tagItem.id}
        className={join(tagStyleMap[tagItem.type], s.tag)}
    >
        {tagItem.content}
    </div>
}