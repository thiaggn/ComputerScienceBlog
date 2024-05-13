import {TagMutation} from "./TagMutation.ts";

export interface BlockMutation {
    mutatedTags: TagMutation[];
    target: Element;
    emptyTagCount: number;
}
