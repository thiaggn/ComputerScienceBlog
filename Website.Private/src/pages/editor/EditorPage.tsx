import s from "./styles/EditorPage.module.scss"
import TextEditor from "./components/TextEditor.tsx";

export default function EditorPage() {
    return <div className={s.editorPage}>
        <TextEditor/>
    </div>
}