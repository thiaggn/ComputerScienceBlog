export class SelectionRecord {
    public readonly anchorNode: Node;
    public readonly anchorOffset: number;
    public readonly focusNode: Node;
    public readonly focusOffset: number;
    public readonly isCollapsed: boolean;
    public readonly type: string;

    constructor(selection: Selection) {
        this.type = selection.type;
        this.anchorNode = selection.anchorNode as Node;
        this.anchorOffset = selection.anchorOffset;
        this.focusNode = selection.focusNode as Node;
        this.focusOffset = selection.focusOffset;
        this.isCollapsed = selection.isCollapsed;
    }
}