import {TagItem, TagType} from "../types/EditorTypes.ts";
import s from "../../../styles/EditorLayout.module.scss";

export function Tag({tag}: { tag: TagItem }) {
    

    switch (tag.type) {
        case TagType.Text:
            return <div editor-tag-id={tag.id} className={s.text}>{tag.content}</div>

        case TagType.Code:
            return <div editor-tag-id={tag.id} className={s.code}>{tag.content}</div>
    }
}