import {EditorSelection} from "../../types/EditorSelection.ts";

export class SelectionListener {

    private static hasAddedListener: boolean = false;
    private static lastSelection: EditorSelection;
    public static start() {
        if(!this.hasAddedListener) {
            document.addEventListener('selectionchange', () => {
                const currentSelection = document.getSelection();
                if(currentSelection) this.lastSelection = new EditorSelection(currentSelection);
            });
        }

        this.hasAddedListener = true;
    }

    public static getLastSelection(): Readonly<EditorSelection> {
        return this.lastSelection;
    }
}