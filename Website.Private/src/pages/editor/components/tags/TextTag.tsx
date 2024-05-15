import { TagStyle, TagType, TextTagState} from "../../types/state/ContentState.ts";
import s from '../../styles/TextEditor.module.scss';
import {join} from "../../../../lib/utils/join.ts";
import {useRef} from "react";
import useTag from "../../hooks/useTag.ts";

type Properties = {
    tagState: TextTagState
}

const styles: Record<TagStyle, string> = {
    [TagStyle.Default]: "",
    [TagStyle.Italic]: s.italic,
    [TagStyle.Bold]: s.bold
}


export default function TextTag({tagState}: Properties) {
    const tagRef = useRef<HTMLDivElement>(null);
    useTag(tagState, tagRef);

    const tagStyles: string[] = tagState.styles.map((s: TagStyle) => styles[s]);

    return <div className={join(s.tag)} editor-tag={tagState.type} ref={tagRef} id={tagState.id}>
        <div className={join(s.editable, ...tagStyles)} editor-editable="">
            {tagState.content}
        </div>
    </div>
}