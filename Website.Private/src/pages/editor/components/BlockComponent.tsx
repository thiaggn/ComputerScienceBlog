import {BlockState} from "../types/texteditor/BlockState.ts";
import s from "../styles/TextEditor.module.scss";
import TagComponent from "./TagComponent.tsx";
import {TagState} from "../types/texteditor/TagState.ts";
import useBlock from "../hooks/useBlock.ts";
import {useRef} from "react";

type Properties = {
    blockState: BlockState
}
export default function BlockComponent({blockState}: Properties) {

    const blockRef = useRef<HTMLDivElement>(null);
    useBlock(blockState, blockRef);

    return <div className={s.block} ref={blockRef} >
        {blockState.tags.map((tagData: TagState) =>
            <TagComponent key={tagData.id} tagData={tagData} parentBlock={blockState}/>
        )}
    </div>
}