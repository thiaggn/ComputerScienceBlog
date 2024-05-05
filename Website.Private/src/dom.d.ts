import {BlogEventDataMap} from "./lib/EditorEvent.ts";

export declare global {
    interface GlobalEventHandlersEventMap {
        "tagInput": CustomEvent<BlogEventDataMap["tagInput"]>;
    }
}