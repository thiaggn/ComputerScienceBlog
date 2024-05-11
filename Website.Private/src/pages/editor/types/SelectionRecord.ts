export class SelectionRecord {
    public readonly anchorNode: Node;
    public readonly anchorOffset: number;
    public readonly focusNode: Node;
    public readonly focusOffset: number;
    public readonly isCollapsed: boolean;
    public readonly type: string;
    public readonly fullySelectedTags: Element[] = [];


    constructor(selection: Selection) {
        this.type = selection.type;
        this.anchorNode = selection.anchorNode as Node;
        this.anchorOffset = selection.anchorOffset;
        this.focusNode = selection.focusNode as Node;
        this.focusOffset = selection.focusOffset;
        this.isCollapsed = selection.isCollapsed;
        const commonAncestor = selection.getRangeAt(0)!.commonAncestorContainer as Element;

        if(commonAncestor instanceof Element) {
            if(commonAncestor.hasAttribute("editor-element")) {

            }

            else if(commonAncestor.hasAttribute("editor-block-element")) {
                this.fullySelectedTags = Array.from(commonAncestor.children).filter(node =>
                    selection.containsNode(node, false)
                );
            }
        }
    }
}