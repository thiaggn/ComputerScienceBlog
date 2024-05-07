/// <reference types="vite/client" />

import {TagStateRequestEventData, TagStateRequestEventName} from "./pages/editor/contexts/editorListener/processModifiedTags.ts";

declare global {
    export interface ElementEventMap {
        [TagStateRequestEventName]: CustomEvent<TagStateRequestEventData>
    }
}