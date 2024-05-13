import {TagMutationData} from "./types/TagMutationData.ts";
import {BlockType} from "./types/editor_elements/state/BlockState.ts";

declare global {
    export interface HTMLElementEventMap {
        "blockmutation": CustomEvent<BlockMutationData>
    }
}

export type BlockMutationData = {
    mutatedTags: TagMutationData[],
    target: Element,
    emptyTagCount: number
}

export class EditorInputListener {
    public static addListener(/*textEditor: Element*/) {
        document.addEventListener("keydown", (ev) => {
            this.handleKeydown(ev);
        });

        const observer = new MutationObserver((ev: MutationRecord[]) => {
            console.log(...ev);
        });
    }
    private static handleKeydown(ev: KeyboardEvent) {
        if (ev.key == "Backspace") {
            const mutations = this.processBlockMutations();
            console.log(mutations);

            for (let mutation of mutations) {
                mutation.target.dispatchEvent(new CustomEvent("blockmutation", {
                    detail: mutation
                }))
            }

            ev.preventDefault();
        }

        else if (ev.key == "Enter") {
            ev.preventDefault()
        }
    }

    private static processBlockMutations() {
        const selection = document.getSelection();
        const range = selection?.getRangeAt(0);
        if (!selection || !range) return [];
        if (!selection.focusNode || !selection.anchorNode) return [];

        const ancestral = range.commonAncestorContainer;
        const changedBlocks: BlockMutationData[] = []

        const position = selection.focusNode.compareDocumentPosition(selection.anchorNode);
        let direction: number = 0;

        switch (position) {
            case Node.DOCUMENT_POSITION_FOLLOWING:
                direction = -1;
                break;
            case Node.DOCUMENT_POSITION_PRECEDING:
                direction = 1;
                break;
        }

        if (ancestral instanceof Element) {
            // Seleção de blocos
            if (this.isTextEditor(ancestral)) {
                const selectedBlockNodes = this.getSelectedTags(selection, ancestral);

                for (let blockElemnet of selectedBlockNodes) {
                    const blockMutation = this.processBlockMutation(selection, blockElemnet, direction);

                    if (blockMutation) {
                        changedBlocks.push(blockMutation);
                    }
                }
            }

            else if (this.isBlock(ancestral)) {
                const blockMutation = this.processBlockMutation(selection, ancestral, direction);

                if (blockMutation) {
                    changedBlocks.push(blockMutation);
                }
            }
        }

        return changedBlocks;
    }

    private static processBlockMutation(selection: Selection, element: Element, direction: number) {
        const blockType = this.getBlockType(element);

        switch (blockType) {
            case BlockType.Text: {
                const selectedTags = this.getSelectedTags(selection, element);
                const {mutatedTags, emptyTagCount} = this.getMutatedTags(selection, selectedTags, direction);

                const blockMutation: BlockMutationData = {
                    target: element,
                    mutatedTags: mutatedTags,
                    emptyTagCount: emptyTagCount
                }

                return blockMutation;
            }
        }
    }

    private static getMutatedTags(selection: Selection, tagElements: Element[], direction: number) {
        let mutatedTags: TagMutationData[] = [];
        let emptyTagCount: number = 0;

        const editableContainers = tagElements.map(el =>
            el.querySelector("[editor-editable]") as Element
        );

        for(let i = 0; i < editableContainers.length; i++) {
            const editable = editableContainers[i];
            const boundaryType = this.getBoundaryType(selection, editable.firstChild);
            const textContent = editable.textContent as string;
            const target = tagElements[i];

            switch (boundaryType) {
                case SelectionBoundary.Anchor: {
                    let unselectedText = direction > 0
                        ? textContent.slice(0, selection.anchorOffset)
                        : textContent.slice(selection.anchorOffset, textContent.length);

                    mutatedTags.push({target: target, value: unselectedText});
                    if(unselectedText.length == 0) emptyTagCount++;
                    break;
                }

                case SelectionBoundary.Focus: {
                    let unselectedText = direction > 0
                        ? textContent.slice(selection.focusOffset, textContent.length)
                        : textContent.slice(0, selection.focusOffset);

                    mutatedTags.push({target: target, value: unselectedText});
                    if(unselectedText.length == 0) emptyTagCount++;
                    break;
                }

                default:
                    mutatedTags.push({target: target, value: ""});
                    emptyTagCount++;
                    break;
            }

            i++;
        }

        return {
            mutatedTags,
            emptyTagCount
        };
    }

    private static getSelectedTags(selection: Selection, ancestral: Element): Element[] {

        // TODO: FAZER COM Q SELECIONE SÓ TAGS... ACHO Q TA SELECIONANDO QUALQUER COISA. no ancestral.. Mas isso
        //  importa?
        let nodes: Element[] = [];
        for (let child of ancestral.children) if (selection.containsNode(child, true)) nodes.push(child);
        return nodes;
    }

    private static getBlockType(element: Element): BlockType {
        const attr = element.getAttribute("editor-block");
        if (attr) return parseInt(attr);
        else return BlockType.Undefined;
    }

    private static isBlock(element: Element) {
        return element.hasAttribute("editor-block");
    }

    private static isTextEditor(element: Element) {
        return element.hasAttribute("text-editor")
    }

    private static getBoundaryType(selection: Selection, textNode: Node | null) {
        if(selection.focusNode == textNode) return SelectionBoundary.Focus;
        if(selection.anchorNode == textNode) return SelectionBoundary.Anchor;
        return SelectionBoundary.None;
    }
}

enum SelectionBoundary {
    None,
    Anchor,
    Focus,
}