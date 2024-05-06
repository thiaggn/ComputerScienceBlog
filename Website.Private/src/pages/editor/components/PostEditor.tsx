import {EditablePostItem} from "../types/PostTypes.ts";
import s from "../styles/PostEditor.module.scss";

type Properties = {
    post: EditablePostItem;
}

export default function PostEditor({post}: Properties) {
    console.log(post);

    return <div className={s.postEditor} {...editable}>

    </div>
}

const editable = {
    contentEditable: true,
    suppressContentEditableWarning: true
}