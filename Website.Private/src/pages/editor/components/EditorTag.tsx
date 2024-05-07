import {TagItem, TagType} from "../types/TagTypes.ts";
import s from "../styles/TextEditor.module.scss";
import {join} from "../../../lib/utils/join.ts";
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
    return <div key={tagItem.id} id={tagItem.id} className={join(tagStyleMap[tagItem.type], s.tag)}>
        {tagItem.content}
    </div>
}