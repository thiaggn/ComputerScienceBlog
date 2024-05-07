import {TagType} from "../item/TagItem.ts";

export interface TagData {
    type: TagType,
    content: any,
    id?: string
}