import {TextBlockState} from "../types/state/BlockState.ts";
import s from "../styles/TextEditor.module.scss";
import TextTag from "./tags/TextTag.tsx";
import {CodeTagState, ContentState, TagType, TextTagState} from "../types/state/ContentState.ts";
import useTextBlock from "../hooks/useTextBlock.ts";
import {useRef} from "react";
import CodeTag from "./tags/CodeTag.tsx";

type Properties = {
    blockState: TextBlockState
}
export default function TextBlock({blockState}: Properties) {
    const blockRef = useRef<HTMLDivElement>(null);

    useTextBlock(blockState, blockRef);

    return <div className={s.textBlock} ref={blockRef} editor-block={blockState.type}>

        {blockState.contents.map((tagState: ContentState) => {
            switch (tagState.type) {
                case TagType.Text:
                    return <TextTag key={tagState.id} tagState={tagState as TextTagState}/>

                case TagType.Code:
                    return <CodeTag key={tagState.id} tagState={tagState as CodeTagState}/>
            }

        })}
    </div>
}