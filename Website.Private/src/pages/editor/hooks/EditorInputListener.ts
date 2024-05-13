import {TagMutation} from "../types/mutation/TagMutation.ts";
import {BlockState, BlockType} from "../types/data/BlockState.ts";
import {BlockMutation} from "../types/mutation/BlockMutation.ts";
import {usePostStore} from "../../../store/postStore.ts";
import {TagState} from "../types/data/TagState.ts";
import {requestBlockState} from "../types/event/requestBlockState.ts";
import {requestTagState} from "../types/event/requestTagState.ts";

declare global {
    export interface HTMLElementEventMap {
        "blockmutation": CustomEvent<BlockMutation>
    }
}

export class EditorInputListener {

    private static postState = usePostStore.getState();

    private static caretDeletionDirection: number = 0;
    public static addListener(/*textEditor: Element*/) {
        document.addEventListener("keydown", (ev) => {
            this.handleKeydown(ev);
        });
    }
    private static async handleKeydown(ev: KeyboardEvent) {
        if (ev.key == "Backspace" || ev.key == "Delete") {
            this.caretDeletionDirection = ev.key == "Backspace" ? -1 : +1;
            ev.preventDefault();
            const blockMutations = this.processBlockMutations();

            switch (blockMutations.length) {
                case 0: {
                    throw new Error();
                }

                case 1: {
                    await this.handleDeletionAcrossTags(blockMutations);
                    break;
                }

                default: {
                    await this.handleDeletionAcrossBlocks(blockMutations);
                    break;
                }
            }
        }

        else if (ev.key == "Enter") {
            ev.preventDefault()
        }
    }

    private static async handleDeletionAcrossTags(blockMutation: BlockMutation[]) {
        const mutation = blockMutation[0];
        const blockState = (await this.getBlockStates(blockMutation))[0];
        const tagStates = await this.getTagState(mutation.mutatedTags);
        this.updateTagStates(blockState.id, tagStates, mutation.mutatedTags);
    }

    private static async handleDeletionAcrossBlocks(blockMutations: BlockMutation[]) {
        const mutationCount = blockMutations.length;
        const firstMutation = blockMutations[0];
        const lastMutation = blockMutations[mutationCount - 1];

        const blockStates = await this.getBlockStates(blockMutations);
        const firstBlockState = blockStates[0];
        const firstBlockHasContent = firstBlockState.contents.length !== firstMutation.emptyTagCount;
        const lastBlockState = blockStates[mutationCount - 1];
        const lastBlockHasContent = lastBlockState.contents.length !== lastMutation.emptyTagCount;

        if (firstBlockHasContent && lastBlockHasContent) {
            const firstBlockModifiedTagStates = await this.getTagState(firstMutation.mutatedTags);
            const lastBlockModifiedTagStates = await this.getTagState(lastMutation.mutatedTags);

            this.updateTagStates(firstBlockState.id, firstBlockModifiedTagStates, firstMutation.mutatedTags);
            this.updateTagStates(lastBlockState.id, lastBlockModifiedTagStates, lastMutation.mutatedTags);
            this.postState.removeBlocks(blockStates);(blockStates.slice(1, blockStates.length - 1));
            this.postState.joinBlocks(firstBlockState.id, lastBlockState.id);
        }

        else if (firstBlockHasContent) {
            const firstBlockModifiedTagStates = await this.getTagState(firstMutation.mutatedTags);
            this.updateTagStates(firstBlockState.id, firstBlockModifiedTagStates, firstMutation.mutatedTags);
            this.postState.removeBlocks(blockStates.slice(1));
        }

        else if (lastBlockHasContent) {
            const lastBlockModifiedTagStates = await this.getTagState(lastMutation.mutatedTags);
            this.updateTagStates(lastBlockState.id, lastBlockModifiedTagStates, lastMutation.mutatedTags);
            this.postState.removeBlocks(blockStates.slice(0, blockStates.length - 1));
        }

        else this.postState.removeBlocks(blockStates);
    }

    private static async getBlockStates(blockMutations: BlockMutation[]): Promise<BlockState<TagState>[]> {
        const blockStates: BlockState<TagState>[] = [];
        for (const blockMutation of blockMutations) {
            blockStates.push(await requestBlockState(blockMutation.target));
        }
        return blockStates;
    }

    private static async getTagState(tagMutations: TagMutation[]): Promise<TagState[]> {
        const modifiedTagStates: TagState[] = [];
        for (const tagMutation of tagMutations) {
            modifiedTagStates.push(await requestTagState(tagMutation.target));
        }
        return modifiedTagStates;
    }

    private static updateTagStates(blockId: string, tagStates: TagState[], tagMutations: TagMutation[]) {
        const updatedTagStates: TagState[] = [];
        for (let i = 0; i < tagStates.length; i++) {
            const state = tagStates[i];
            const mutation = tagMutations[i];
            updatedTagStates.push({ ...state, content: mutation.value });
        }
        this.postState.updateTextTagsInBlock(blockId, updatedTagStates);
    }

    private static processBlockMutations() {
        const selection = document.getSelection();
        const range = selection?.getRangeAt(0);
        if (!selection || !range) return [];
        if (!selection.focusNode || !selection.anchorNode) return [];

        const ancestral = range.commonAncestorContainer;
        const changedBlocks: BlockMutation[] = []

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

        else if(ancestral.parentElement instanceof Element) {
            const editableElement = ancestral.parentElement;

            if(editableElement.hasAttribute("editor-editable")) {
                const parentBlock = editableElement.closest("[editor-block]");
                if(!parentBlock) throw new Error();

                const blockMutation = this.processBlockMutation(selection, parentBlock, direction);

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

                const blockMutation: BlockMutation = {
                    target: element,
                    mutatedTags: mutatedTags,
                    emptyTagCount: emptyTagCount
                }

                return blockMutation;
            }
        }
    }

    private static getMutatedTags(selection: Selection, tagElements: Element[], direction: number) {
        let mutatedTags: TagMutation[] = [];
        let emptyTagCount: number = 0;

        const editableElements = tagElements.map(el =>
            el.querySelector("[editor-editable]") as Element
        );

        if(selection.type == "Caret") {
            const editableElement: Element = editableElements[0];
            const textContent = editableElement.textContent as string;
            let content: string = "";

            if(this.caretDeletionDirection < 0) {
                const start = textContent.slice(0, selection.focusOffset - 1);
                const end = textContent.slice(selection.focusOffset);
                content = start.concat(end);
            }

            else {
                const start = textContent.slice(0, selection.focusOffset);
                const end = textContent.slice(selection.focusOffset + 1);
                content = start.concat(end);
            }

            if(content.length == 0) emptyTagCount++;

            mutatedTags.push({
                target: tagElements[0],
                value: content
            })
        }

        else if(selection.focusNode == selection.anchorNode) {
            const editableElement: Element = editableElements[0];
            const textContent = editableElement.textContent as string;
            let startOffset = selection.anchorOffset;
            let endOffset = selection.focusOffset;

            if(startOffset > endOffset) [startOffset, endOffset] = [endOffset, startOffset];

            let start = textContent.slice(0, startOffset);
            let end = textContent.slice(endOffset);
            let content = start.concat(end);

            mutatedTags.push({
                target: tagElements[0],
                value: content
            })

            if(content.length == 0) emptyTagCount++;
        }

        else for (let i = 0; i < editableElements.length; i++) {
            const targetElement: Element = tagElements[i];
            const editableElement: Element = editableElements[i];
            const boundaryType: SelectionBoundary = this.getBoundaryType(selection, editableElement.firstChild);
            const textContent = editableElement.textContent as string;

            switch (boundaryType) {
                case SelectionBoundary.Anchor: {
                    let unselectedText = direction > 0
                        ? textContent.slice(0, selection.anchorOffset)
                        : textContent.slice(selection.anchorOffset, textContent.length);

                    mutatedTags.push({target: targetElement, value: unselectedText});
                    if(unselectedText.length == 0) emptyTagCount++;
                    break;
                }

                case SelectionBoundary.Focus: {
                    let unselectedText = direction > 0
                        ? textContent.slice(selection.focusOffset, textContent.length)
                        : textContent.slice(0, selection.focusOffset);


                    mutatedTags.push({target: targetElement, value: unselectedText});
                    if(unselectedText.length == 0) emptyTagCount++;
                    break;
                }

                case SelectionBoundary.None:
                default:
                    mutatedTags.push({target: targetElement, value: ""});
                    emptyTagCount++;
                    break;
            }
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
        for (let child of ancestral.children) {
            const contains = selection.containsNode(child, true);
            if (contains) nodes.push(child);
        }
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
