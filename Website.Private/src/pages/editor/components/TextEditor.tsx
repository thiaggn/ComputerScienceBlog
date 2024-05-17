import s from "../styles/TextEditor.module.scss";
import TextBlock from "./blocks/TextBlock.tsx";
import {useRef} from "react";
import {BlockNeighbor, BlockState, BlockType} from "../types/state/BlockState.ts";
import {exclusiveMap} from "../../../utils/exclusiveMap.ts";
import {TextBlockState} from "../types/state/block/TextBlockState.ts";
import {usePostBlocks} from "../PostStore.ts";
import {useInputEvents} from "../hooks/useInputEvents.ts";

type Properties = {
    blocks: BlockState[]
}

const config = {
    contentEditable: true,
    suppressContentEditableWarning: true
}
export default function TextEditor({blocks}: Properties) {
    useInputEvents(blocks);

    let lastInsertedBlock: BlockNeighbor;

    return <div className={s.textEditor} text-editor="" {...config}>
        {blocks && exclusiveMap(blocks, (blockState: BlockState) => {

            blockState.prev = lastInsertedBlock;
            if(lastInsertedBlock) lastInsertedBlock.next = blockState;
            lastInsertedBlock = blockState;

            switch (blockState.type) {
                case BlockType.Text:
                    return <TextBlock key={blockState.id} blockState={blockState as TextBlockState}/>
            }
        })}
    </div>
}
