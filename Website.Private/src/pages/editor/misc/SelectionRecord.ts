export class SelectionRecord {
    public readonly anchorNode: Node;
    public readonly anchorOffset: number;
    public readonly focusNode: Node;
    public readonly focusOffset: number;
    public readonly isCollapsed: boolean;
    public readonly withinSameElement: boolean;
    public readonly commonAncestor: Node;
    public readonly nodesWithinSelection: Node[] = [];
    public readonly type: string;

    constructor(selection: Selection) {
        this.type = selection.type;
        this.anchorNode = selection.anchorNode as Node;
        this.anchorOffset = selection.anchorOffset;
        this.focusNode = selection.focusNode as Node;
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