import {EditorCommand} from "../types/EditorCommand.ts";

export function processKeyboardCommand(ev: KeyboardEvent) {
    if (ev.key == 'z' && ev.ctrlKey) return EditorCommand.Undo;
    else if (ev.key == 'y' && ev.ctrlKey) return EditorCommand.Redo;
    else if (ev.key == 'v' && ev.ctrlKey && ev.shiftKey) return EditorCommand.PasteWithoutFormatting;
    else if (ev.key == 'v' && ev.ctrlKey) return EditorCommand.PasteWithFormatting;
    else if (ev.key === 'Backspace' && !ev.ctrlKey) return EditorCommand.DeleteCharacter;
    else if (ev.key === 'Backspace' && ev.ctrlKey) return EditorCommand.DeleteWord
    else return EditorCommand.None;
}