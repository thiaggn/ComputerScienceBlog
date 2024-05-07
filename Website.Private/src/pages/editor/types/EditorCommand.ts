export enum EditorCommand {
    None,
    Undo,
    Redo,
    PasteWithFormatting,
    PasteWithoutFormatting,
    DeleteCharacter,
    // Deleta da posição atual da caret até o fim da palavra.
    // Se a caret está atualmente num espaço, ele será consumido.
    DeleteWord,
}