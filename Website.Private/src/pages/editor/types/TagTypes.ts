import {v4 as v4uuid} from "uuid";
export enum TagType {
    Text,
    Code,
}
export interface TagData {
    type: TagType,
    content: any
}

export class TagItem {
    id: string;
    type: TagType;
    content: any;

    private constructor(id: string, type: TagType, content: any) {
        this.id = id;
        this.type = type;
        this.content = content;
    }

    public static create(data: TagData) {
        return new TagItem(v4uuid(), data.type, data.content);
    }
}