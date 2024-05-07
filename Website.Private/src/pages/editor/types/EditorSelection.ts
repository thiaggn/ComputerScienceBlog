export class EditorSelection {
    public readonly anchorNode: Node | null;
    public readonly anchorOffset: number;
    public readonly focusNode: Node | null;
    public readonly focusOffset: number;
    public readonly isCollapsed: boolean;
    public readonly withinSameElement: boolean;
    public readonly commonAncestor: Node;
    public readonly nodesWithinSelection: Node[] = [];

    constructor() {
        const selection = document.getSelection() as Selection;
        this.anchorNode = selection.anchorNode;
        this.anchorOffset = selection.anchorOffset;
        this.focusNode = selection.focusNode;
        this.focusOffset = selection.focusOffset;
        this.isCollapsed = selection.isCollapsed;
        this.withinSameElement = selection.anchorNode === selection.focusNode;
        this.commonAncestor = selection.getRangeAt(0).commonAncestorContainer;

        if (!this.withinSameElement) {
            for (let child of this.commonAncestor.childNodes) {
                if (selection.containsNode(child, true)) {
                    this.nodesWithinSelection.push(child);
                }
            }
        }
    }
}