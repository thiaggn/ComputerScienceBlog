import {TagMutation} from "./types/mutation/TagMutation.ts";
import {BlockState, BlockType} from "./types/state/BlockState.ts";
import {BlockMutation} from "./types/mutation/BlockMutation.ts";
import {ContentState} from "./types/state/ContentState.ts";
import {PostStoreAction, PostStoreMutation, usePostStore} from "../../store/postStore.ts";
import {requestBlockState} from "./utils/requestBlockState.ts";
import {requestTagState} from "./utils/requestTagState.ts";
import {EditorSnapshotService} from "./EditorSnapshotService.ts";
import getSelectionDirection from "../../utils/getSelectionDirection.ts";
import {EditorCaretHandler} from "./EditorCaretHandler.ts";
import {NodeColappsedCaretRecord} from "./types/caret/record/NodeCollapsedCaretRecord.ts";

declare global {
    export interface HTMLElementEventMap {
        "blockmutation": CustomEvent<BlockMutation>
    }
}

export class EditorDeletionHandler {
    private static deletionDirection: number = 0;

    public static setListeners(/*textEditor: Element*/) {
        document.addEventListener("keydown", (ev) => {
            this.handleKeydown(ev);
        });
    }
    private static async handleKeydown(ev: KeyboardEvent) {

        switch (ev.key) {
            case "z": {
                if(ev.ctrlKey) {
                    ev.preventDefault();
                    const snapshot = EditorSnapshotService.retrocede();
                    const currentBlocks = usePostStore.getState().blocks;
                    if(snapshot.blocks != currentBlocks) usePostStore.getState().goToSnapshot(snapshot);
                }

                break;
            }

            case "y": {
                if(ev.ctrlKey) {
                    ev.preventDefault();
                    const snapshot = EditorSnapshotService.advance();
                    const currentBlocks = usePostStore.getState().blocks;
                    if(snapshot.blocks != currentBlocks) usePostStore.getState().goToSnapshot(snapshot);
                }
                break;
            }

            case "Enter": {
                ev.preventDefault()
                break;
            }

            case "Backspace": case "Delete": case "x": {
                if(ev.key == "x" && !ev.ctrlKey) return;
                await this.handleDeletion(ev);
                break;
            }

            case "b": {
                if(ev.ctrlKey) ev.preventDefault();
                break;
            }

            case "i": {
                if(ev.ctrlKey) ev.preventDefault();
                break;
            }

            case "u": {
                if(ev.ctrlKey) ev.preventDefault();
            }
        }
    }

    private static async handleDeletion(ev: KeyboardEvent) {
        this.deletionDirection = ev.key == "Backspace" ? -1 : +1;
        const blockMutations = this.processBlockMutations();
        const selection = document.getSelection() as Selection;
        const focusNode = selection.focusNode as Node;
        const anchorNode = selection.anchorNode as Node;
        const firstBlockMutation = blockMutations[0];
        const firstTagMutation = firstBlockMutation.mutatedTags[0];
        const firstBlockMutationCount = firstBlockMutation.mutatedTags.length;

        const position = focusNode.compareDocumentPosition(anchorNode);
        let direction: number = 0;

        switch (position) {
            case Node.DOCUMENT_POSITION_FOLLOWING: direction = -1; break;
            case Node.DOCUMENT_POSITION_PRECEDING: direction = 1; break;
        }

        // Deleção de conteúdo somente dentro de um bloco
        if(blockMutations.length == 1) {

            if(firstBlockMutationCount == 1 && firstTagMutation.isSingleCharacterDeletion) {

                // Consumiu o último caractere de uma tag
                if(firstTagMutation.value.length == 1) {
                    console.log(direction);
                    const blockState = (await this.getBlockStates([firstBlockMutation]))[0];
                    const tagState = (await this.getTagStates([firstTagMutation]))[0];

                    new PostStoreMutation()
                        .removeTextTags(blockState.id, [tagState])
                        .finish();

                    ev.preventDefault();
                }

                // A tag ainda tem caracteres restantes
                else {
                    const tagTextLength = focusNode.textContent?.length || 0;
                    const remaining = tagTextLength - selection.focusOffset - 1;
                    const tagState = await requestTagState(firstTagMutation.target);
                    const blockState = await requestBlockState(firstBlockMutation.target);
                    const nextTag = PostStoreAction.findSucessorTag(blockState, tagState);

                    // Não resta caracteres à frente da caret para deletar
                    if(nextTag == null && remaining < 0 && this.deletionDirection > 0) {
                        const secondBlock = PostStoreAction.findSucessorBlock(blockState);

                        await EditorCaretHandler.setNextCaretPosition( new NodeColappsedCaretRecord(
                            focusNode, selection.focusOffset
                        ));

                        if(secondBlock != null) {
                            new PostStoreMutation()
                                .joinTextBlocks(blockState.id, secondBlock.id)
                                .finish();
                        }

                        ev.preventDefault();
                    }

                    else{
                        // Move a caret para trás
                        if(this.deletionDirection < 0) {
                            await EditorCaretHandler.setNextCaretPosition( new NodeColappsedCaretRecord(
                                focusNode, selection.focusOffset - 1
                            ));
                        }

                        // Mantém a caret na mesma posição
                        else {
                            await EditorCaretHandler.setNextCaretPosition (new NodeColappsedCaretRecord(
                                focusNode, selection.focusOffset
                            ));
                        }
                    }
                }
            }

            else if(firstBlockMutationCount > 1) {
                if(direction > 0) {
                    await EditorCaretHandler.setNextCaretPosition(new NodeColappsedCaretRecord(
                        selection.anchorNode as Node,
                        selection.anchorOffset
                    ));
                }

                else if(direction < 0) {
                    await EditorCaretHandler.setNextCaretPosition(new NodeColappsedCaretRecord(
                        selection.focusNode as Node,
                        selection.focusOffset
                    ));
                }

                console.log("caiu aqui");
                await this.handleDeletionAcrossTags(blockMutations);
                ev.preventDefault();
            }
        }

        // Deleção de conteúdo de múltiplos blocos
        else if(blockMutations.length > 1) {
            const node = direction > 0 ? anchorNode : focusNode;
            const offset = direction > 0 ? selection.anchorOffset : selection.focusOffset;

            await EditorCaretHandler.setNextCaretPosition( new NodeColappsedCaretRecord(
                node, offset
            ));

            await this.handleDeletionAcrossBlocks(blockMutations);
            ev.preventDefault();
        }
    }

    private static async handleDeletionAcrossTags(blockMutation: BlockMutation[]) {
        const mutation = blockMutation[0];
        const blockState = (await this.getBlockStates(blockMutation))[0];
        const tagStates = await this.getTagStates(mutation.mutatedTags);

        const newTagStates = this.mergeTagStatesAndMutations(tagStates, mutation.mutatedTags);

        new PostStoreMutation()
            .updateTextTags(blockState.id, newTagStates)
            .finish();
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
            const firstBlockModifiedTagStates = await this.getTagStates(firstMutation.mutatedTags);
            const lastBlockModifiedTagStates = await this.getTagStates(lastMutation.mutatedTags);

            const firstBlockNewTagStates = this.mergeTagStatesAndMutations(
                firstBlockModifiedTagStates, firstMutation.mutatedTags
            );

            const lastBlockNewTagStates = this.mergeTagStatesAndMutations(
                lastBlockModifiedTagStates, lastMutation.mutatedTags
            );

            new PostStoreMutation()
                .removeBlocks(blockStates.slice(1, blockStates.length - 1))
                .updateTextTags(firstBlockState.id, firstBlockNewTagStates)
                .updateTextTags(lastBlockState.id, lastBlockNewTagStates)
                .joinTextBlocks(firstBlockState.id, lastBlockState.id)
                .finish();
        }

        else if (firstBlockHasContent) {
            const firstBlockModifiedTagStates = await this.getTagStates(firstMutation.mutatedTags);
            const newTagStates = this.mergeTagStatesAndMutations(
                firstBlockModifiedTagStates,
                firstMutation.mutatedTags
            );

            new PostStoreMutation()
                .updateTextTags(firstBlockState.id, newTagStates)
                .removeBlocks(blockStates.slice(1))
                .finish();
        }

        else if (lastBlockHasContent) {
            const lastBlockModifiedTagStates = await this.getTagStates(lastMutation.mutatedTags);
            const newTagStates = this.mergeTagStatesAndMutations(lastBlockModifiedTagStates, lastMutation.mutatedTags);

            new PostStoreMutation()
                .updateTextTags(lastBlockState.id, newTagStates)
                .removeBlocks(blockStates.slice(0, blockStates.length - 1))
                .finish();
        }

        else new PostStoreMutation().removeBlocks(blockStates).finish();
    }

    private static async getBlockStates(blockMutations: BlockMutation[])
    {
        const blockStates: BlockState[] = [];

        for (const blockMutation of blockMutations) {
            const state = await requestBlockState(blockMutation.target);
            blockStates.push(state);
        }

        return blockStates;
    }

    public static async getTagStates(tagMutations: TagMutation[]): Promise<ContentState[]> {
        const modifiedTagStates: ContentState[] = [];
        for (const tagMutation of tagMutations) {
            modifiedTagStates.push(await requestTagState(tagMutation.target));
        }
        return modifiedTagStates;
    }

    private static mergeTagStatesAndMutations(tagStates: ContentState[], tagMutations: TagMutation[]) {
        const updatedTagStates: ContentState[] = [];
        for (let i = 0; i < tagStates.length; i++) {
            const state = tagStates[i];
            const mutation = tagMutations[i];
            updatedTagStates.push({ ...state, content: mutation.value });
        }

        return updatedTagStates;
    }

    private static processBlockMutations() {
        const selection = document.getSelection();
        const range = selection?.getRangeAt(0);
        if (!selection || !range) return [];
        if (!selection.focusNode || !selection.anchorNode) return [];

        const ancestral = range.commonAncestorContainer;
        const changedBlocks: BlockMutation[] = []
        let direction = getSelectionDirection();

        if (ancestral instanceof Element) {
            if (this.isTextEditor(ancestral)) {
                const selectedBlockNodes = this.getSelectedTags(selection, ancestral);

                for (let blockElemnet of selectedBlockNodes) {
                    const blockMutation = this.getBlockMutation(selection, blockElemnet, direction);

                    if (blockMutation) {
                        changedBlocks.push(blockMutation);
                    }
                }
            }

            else if (this.isBlock(ancestral)) {
                const blockMutation = this.getBlockMutation(selection, ancestral, direction);

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

                const blockMutation = this.getBlockMutation(selection, parentBlock, direction);

                if (blockMutation) {
                    changedBlocks.push(blockMutation);
                }
            }
        }

        return changedBlocks;
    }

    private static getBlockMutation(selection: Selection, element: Element, direction: number) {
        const blockType = this.getBlockType(element);

        switch (blockType) {
            case BlockType.Text: {
                const selectedTags = this.getSelectedTags(selection, element);

                const {mutatedTags, emptyTagCount} = this.getTagMutations(selection, selectedTags, direction);

                const blockMutation: BlockMutation = {
                    target: element,
                    mutatedTags: mutatedTags,
                    emptyTagCount: emptyTagCount
                }

                return blockMutation;
            }
        }
    }

    private static getTagMutations(selection: Selection, tagElements: Element[], direction: number) {
        let mutatedTags: TagMutation[] = [];
        let emptyTagCount: number = 0;

        const editableElements = tagElements.map(el =>
            el.querySelector("[editor-editable]") as Element
        );

        if(selection.type == "Caret") {
            const editableElement: Element = editableElements[0];
            const textContent = editableElement.textContent as string;

            mutatedTags.push({
                target: tagElements[0],
                value: textContent,
                isSingleCharacterDeletion: true,
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

        else if(selection.type == "Range") for (let i = 0; i < editableElements.length; i++) {
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
        else throw new Error("Bloco sem tipo");
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
