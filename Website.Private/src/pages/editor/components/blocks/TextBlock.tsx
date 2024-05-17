import s from "../../styles/TextEditor.module.scss";
import TextTag from "../tags/TextTag.tsx";
import {TagState, TagType} from "../../types/state/TagState.ts";
import {useRef} from "react";
import CodeTag from "../tags/CodeTag.tsx";
import {TextTagState} from "../../types/state/tag/TextTagState.ts";
import {CodeTagState} from "../../types/state/tag/CodeTagState.ts";
import {TextBlockState} from "../../types/state/block/TextBlockState.ts";

import {useBlockEvents} from "../../hooks/useBlockEvents.ts";
import {ContentNeighbor} from "../../types/state/ContentState.ts";

type Properties = {
    blockState: TextBlockState
}
export default function TextBlock({blockState}: Properties) {
    const ref = useRef<HTMLDivElement>(null);
    useBlockEvents(ref, blockState);

    let lastInsertedTag: ContentNeighbor;

    return <div ref={ref} id={blockState.id} className={s.textBlock} editor-block={blockState.type}>
        {blockState.contents.map((tagState: TagState) => {

            if(lastInsertedTag) lastInsertedTag.next = tagState;
            tagState.prev = lastInsertedTag;
            lastInsertedTag = tagState;

            switch (tagState.type) {
                case TagType.Text:
                    return <TextTag key={tagState.id} parent={blockState} tagState={tagState as TextTagState}/>

                case TagType.Code:
                    return <CodeTag key={tagState.id} parent={blockState} tagState={tagState as CodeTagState}/>
            }
        })}
    </div>
}