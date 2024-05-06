import {BlockItem, BlockType, PostItem} from "../types/EditorTypes.ts";
import s from "../../../styles/EditorLayout.module.scss";
import {Block} from "./Block.tsx";
import {BlockUpdateData} from "../types/BlockUpdateData.ts";

type Properties = {
    postItem: PostItem;
    onUpdate: (updates: BlockUpdateData[]) => void
}
export function Editor({postItem, onUpdate}: Properties) {

    return <div className={s.textarea}>
        {postItem.blocks.valueSeq().map((block: BlockItem) =>
            <Block onUpdate={onUpdate} key={block.id} block={block}/>
        )}
    </div>
}