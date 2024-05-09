import {TagState, TagType} from "../types/state/TagState.ts";
import s from '../styles/TextEditor.module.scss';
import {join} from "../../../lib/utils/join.ts";
import useTag from "../hooks/useTag.ts";
import {useRef} from "react";
import {BlockState} from "../types/state/BlockState.ts";

type Properties = {
    tagData: TagState,
    parentBlock: BlockState,
}

const styles: Record<TagType, string> = {
    [TagType.Text]: s.text,
    [TagType.Italic]: s.italic,
    [TagType.Code]: s.code,
    [TagType.Bold]: s.bold
}
export default function TagComponent({tagData, parentBlock}: Properties) {

    const tagRef = useRef<HTMLDivElement>(null);
    useTag(tagData, parentBlock, tagRef);

    return <div className={join(s.tag, styles[tagData.type])} ref={tagRef}>
        {tagData.content}
    </div>
}