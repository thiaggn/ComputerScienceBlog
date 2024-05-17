
import s from '../../styles/TextEditor.module.scss';
import {useRef} from "react";
import {join} from "../../../../lib/utils/join.ts";
import {CodeTagState} from "../../types/state/tag/CodeTagState.ts";
import {TextBlockState} from "../../types/state/block/TextBlockState.ts";

import {useTagEvents} from "../../hooks/useTagEvents.ts";

type Properties = {
    tagState: CodeTagState,
    parent: TextBlockState
}

export default function CodeTag({tagState, parent}: Properties) {
    const tagRef = useRef<HTMLDivElement>(null);
    useTagEvents(tagRef, tagState);

    const styles = join(s.tag, s.code, tagState.empty && s.empty);

    return <div id={tagState.id} className={styles} editor-tag={tagState.type} ref={tagRef}>
        <div className={join(s.editable)} editor-editable="">
            {tagState.content}
        </div>
    </div>
}