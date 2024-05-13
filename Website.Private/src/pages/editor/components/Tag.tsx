import {TagState, TagType} from "../types/data/TagState.ts";
import s from '../styles/TextEditor.module.scss';
import {join} from "../../../lib/utils/join.ts";
import useTextTag from "../hooks/useTextTag.ts";
import {useRef} from "react";
import {BlockState} from "../types/data/BlockState.ts";

type Properties = {
    tagState: TagState
}

const styles: Record<TagType, string> = {
    [TagType.Text]: s.text,
    [TagType.Italic]: s.italic,
    [TagType.Code]: s.code,
    [TagType.Bold]: s.bold
}
export default function Tag({tagState}: Properties) {

    const tagRef = useRef<HTMLDivElement>(null);
    useTextTag(tagState, tagRef);

    return <div className={join(s.tag, styles[tagState.type])} editor-tag={tagState.type} ref={tagRef}>
        <div className={s.editable} editor-editable="">
            {tagState.content}
        </div>
    </div>
}