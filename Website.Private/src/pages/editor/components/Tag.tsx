import {TagState, TagType} from "../types/editor_elements/state/TagState.ts";
import s from '../styles/TextEditor.module.scss';
import {join} from "../../../lib/utils/join.ts";
import useTextTag from "../hooks/useTextTag.ts";
import {useRef} from "react";
import {BlockState} from "../types/editor_elements/state/BlockState.ts";

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

    return <div className={join(s.tag, styles[tagState.type])} editor-tag={tagState.type}>
        <div className={s.editable} ref={tagRef} editor-editable="">
            {tagState.content}
        </div>
    </div>
}