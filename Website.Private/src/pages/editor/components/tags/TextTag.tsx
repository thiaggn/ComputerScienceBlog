import { TagStyle} from "../../types/state/TagState.ts";
import s from '../../styles/TextEditor.module.scss';
import {join} from "../../../../lib/utils/join.ts";
import {TextTagState} from "../../types/state/tag/TextTagState.ts";
import {TextBlockState} from "../../types/state/block/TextBlockState.ts";
import {useRef} from "react";

import {useTagEvents} from "../../hooks/useTagEvents.ts";

type Properties = {
    tagState: TextTagState,
    parent: TextBlockState
}

const styles: Record<TagStyle, string> = {
    [TagStyle.Default]: "",
    [TagStyle.Italic]: s.italic,
    [TagStyle.Bold]: s.bold
}

export default function TextTag({tagState, parent}: Properties) {
    const ref = useRef<HTMLDivElement>(null);
    useTagEvents(ref, tagState);

    const tagStyles: string[] = tagState.styles.map((s: TagStyle) => styles[s]);

    return <div ref={ref} id={tagState.id} className={join(s.tag)}  editor-tag={tagState.type}>
        <div className={join(s.editable, ...tagStyles)} editor-editable="">
            {tagState.content}
        </div>
    </div>
}