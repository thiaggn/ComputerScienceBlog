import {BlockState} from "../types/data/BlockState.ts";
import s from "../styles/TextEditor.module.scss";
import Tag from "./Tag.tsx";
import {TagState} from "../types/data/TagState.ts";
import useTextBlock from "../hooks/useTextBlock.ts";
import {useRef} from "react";
import useBlock from "../hooks/useBlock.ts";

type Properties = {
    blockState: BlockState<TagState>
}
export default function TextBlock({blockState}: Properties) {
    const blockRef = useRef<HTMLDivElement>(null);

    useTextBlock(blockState, blockRef);

    return <div className={s.block} ref={blockRef} editor-block={blockState.type}>
        {blockState.contents.map((tagData: TagState) =>
            <Tag key={tagData.id} tagState={tagData}/>
        )}
    </div>
}