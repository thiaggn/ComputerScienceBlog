import s from "./styles/EditorPage.module.scss"
import {useEffect, useState} from "react";
import {PostItem} from "./types/item/PostItem.ts";
import TextEditor from "./components/TextEditor.tsx";
import {EditablePostProvider} from "../../lib/providers/EditablePostProvider.ts";
import {createEditorListener} from "./contexts/editorListener/createEditorListener.ts";
import {EditorListener} from "./contexts/editorListener/EditorListener.ts";

const editorListener = createEditorListener();
export default function EditorPage() {


    return <div className={s.editorPage}>
        <EditorListener.Provider value={editorListener}>
            {<TextEditor/>}
        </EditorListener.Provider>
    </div>
}