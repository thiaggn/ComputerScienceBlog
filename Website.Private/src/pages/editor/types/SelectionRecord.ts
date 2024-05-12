
export interface PartiallySelectedElement {
    element: Element,
    unselectedContent: string
}
export class SelectionRecord {
    public readonly actual: Selection;
    public readonly anchorNode: Node;
    public readonly anchorOffset: number;
    public readonly focusNode: Node;
    public readonly focusOffset: number;
    public readonly isCollapsed: boolean;
    public readonly type: string;

    public readonly fullySelectedTags: Element[] = [];
    public readonly partiallySelectedTags: PartiallySelectedElement[] = [];

    public readonly fullySelectedBlocks: Element[] = [];

    public readonly direction: number = 0;
    public readonly withinSameNode: boolean;

    constructor(selection: Selection) {
        this.actual = selection;
        this.type = selection.type;
        this.anchorNode = selection.anchorNode as Node;
        this.anchorOffset = selection.anchorOffset;
        this.focusNode = selection.focusNode as Node;
        this.focusOffset = selection.focusOffset;
        this.isCollapsed = selection.isCollapsed;
        this.withinSameNode = selection.focusNode == selection.anchorNode;

        if (this.withinSameNode) {
            this.direction = this.anchorOffset >= this.focusOffset ? 1 : -1;
        }

        else {
            const position = this.focusNode.compareDocumentPosition(this.anchorNode);

            switch (position) {
                case Node.DOCUMENT_POSITION_FOLLOWING: this.direction = -1; break;
                case Node.DOCUMENT_POSITION_PRECEDING: this.direction = 1; break;
            }
        }

        const commonAncestor = selection.getRangeAt(0)!.commonAncestorContainer as Element;

        if(commonAncestor instanceof Element) {
            if(commonAncestor.hasAttribute("editor-element")) {

                for(let block of commonAncestor.children) {
                    if(selection.containsNode(block, true)) {
                        const tagElements = block.children;
                        const fullySelectedCount = extractFullySelectedTags(this, tagElements);

                        if(tagElements.length == fullySelectedCount) {
                            this.fullySelectedBlocks.push(block);
                        }
                    }
                }
            }

            else if(commonAncestor.hasAttribute("editor-block-element")) {
                const tagElements = commonAncestor.children;
                const fullySelectedCount = extractFullySelectedTags(this, tagElements);

                if(tagElements.length == fullySelectedCount) {
                    this.fullySelectedBlocks.push(commonAncestor);
                }
            }

            extractPartiallySelectedTags(this);
        }
    }
}

function getSelectedContent(element: Element, offset: number, direction: number): string {
    const content = element.textContent as string;
    if (direction > 0) {
        return content.slice(offset, content.length);
    } else {
        return content.slice(0, offset);
    }
}
function isFullyContained(selection: SelectionRecord, element: Element): boolean {
    const isAnchor = selection.anchorNode == element.firstChild;
    const isFocus = selection.focusNode == element.firstChild;
    const textLength = (element.firstChild?.textContent?.length  || 0) - 1;

    if(isFocus) {
        const selectedLength = selection.direction > 0
            ?  selection.focusOffset
            : textLength - selection.focusOffset;

        if(selectedLength - textLength == 0) return true;
    }

    else if(isAnchor) {
        const selectedLength = selection.direction > 0
            ? textLength - selection.anchorOffset
            : selection.anchorOffset

        if(selectedLength - textLength == 0) return true;
    }

    return selection.actual.containsNode(element, false);
}


function extractFullySelectedTags(s: SelectionRecord, tagElements: HTMLCollection) {
    let fullySelectedCount = 0;

    for(let tag of Array.from(tagElements)) {
        if(isFullyContained(s, tag)) {
            s.fullySelectedTags.push(tag);
            fullySelectedCount++;
        }
    }

    return fullySelectedCount;
}

function extractPartiallySelectedTags(s: SelectionRecord) {
    const parentFocus = s.focusNode.parentElement as Element;
    const parentAnchor = s.anchorNode.parentElement as Element;

    if(!isFullyContained(s, parentFocus)) {
        s.partiallySelectedTags.push({
            element: parentFocus,
            unselectedContent: getSelectedContent(parentFocus, s.focusOffset, s.direction)
        })
    }

    if(!isFullyContained(s, parentAnchor)) {
        s.partiallySelectedTags.push({
            element: parentAnchor,
            unselectedContent: getSelectedContent(parentAnchor, s.anchorOffset, s.direction * -1)
        })
    }
}