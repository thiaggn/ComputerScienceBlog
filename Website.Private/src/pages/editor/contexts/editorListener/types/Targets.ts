import {BlockItem} from "../../../types/item/BlockItem.ts";
import {TagItem} from "../../../types/item/TagItem.ts";

export type BlockTarget = {
    item: Readonly<BlockItem>
}
export type TagTarget = {
    readonly item: Readonly<TagItem>
}