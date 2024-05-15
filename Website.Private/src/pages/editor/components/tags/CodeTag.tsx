
import s from '../../styles/TextEditor.module.scss';
import {useRef} from "react";
import {CodeTagState, TagStyle, TagType} from "../../types/state/ContentState.ts";
import useTag from "../../hooks/useTag.ts";
import {join} from "../../../../lib/utils/join.ts";

type Properties = {
    tagState: CodeTagState
}

export default function CodeTag({tagState}: Properties) {
    const tagRef = useRef<HTMLDivElement>(null);
    useTag(tagState, tagRef);

    return <div className={join(s.tag, s.code)} editor-tag={tagState.type} ref={tagRef} id={tagState.id}>
        <div className={join(s.editable)} editor-editable="">
            {tagState.content}
        </div>
    </div>
}