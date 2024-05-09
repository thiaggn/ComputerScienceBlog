import {TextEditorRole} from "./TextEditorRole.ts";
export enum TagType {
    Text,
    Code,
    Bold,
    Italic,
}
export interface TagState {
    role: TextEditorRole.Tag;
    id: string;
    type: TagType;
    content: any;
    isInactive: boolean;
}