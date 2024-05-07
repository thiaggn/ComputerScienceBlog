import {createContext} from "react";
import {EditorListenerActions} from "./createEditorListener.ts";

export const EditorListener = createContext<EditorListenerActions | undefined>(undefined);