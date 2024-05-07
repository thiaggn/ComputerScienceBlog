import {v4 as v4uuid} from "uuid";
import {EditorItem, ItemRole} from "./EditorItem.ts";
import {TagData} from "../data/TagData.ts";

export enum TagType {
    Text,
    Code,
    Bold,
    Italic,
}

export class TagItem  implements EditorItem {
    readonly role = ItemRole.Tag;
    readonly id: string;
    readonly type: TagType;
    readonly content: any;

    private constructor(id: string, type: TagType, content: any) {
        this.id = id;
        this.type = type;
        this.content = content;
    }

    public static create(data: TagData) {
        return new TagItem(v4uuid(), data.type, data.content);
    }
}