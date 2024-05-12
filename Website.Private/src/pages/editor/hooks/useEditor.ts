import {RefObject, useEffect} from "react";
import {usePostStore} from "../../../store/postStore.ts";
import {SelectionService} from "../SelectionService.ts";
import {SnapshotService} from "../SnapshotService.ts";
import {BlockState} from "../types/texteditor/BlockState.ts";

export default function useEditor(ref: RefObject<HTMLDivElement>, blocks: BlockState[]) {

    const post = usePostStore(state => ({
        goToSnapshot: state.goToSnapshot
    }))

    // ============== Everytime
    useEffect(() => {
        const element = ref.current;

        if (element) {
            const handleInput = () => {
                const selection = document.getSelection();
                const caretPosition = SelectionService.nextCaretPosition;

                if (caretPosition && selection) {
                    selection.setPosition(caretPosition.node, caretPosition.offset);
                }
            }

            element.addEventListener("input", handleInput);
            element.setAttribute("editor-element", "");

            return () => element.removeEventListener('input', handleInput);
        }
    });

    // ============== When blocks changes
    useEffect(() => {

        const handleKeyboardEvent = (ev: KeyboardEvent) => {
            if (ev.ctrlKey && ev.key == "z") {
                ev.preventDefault();
                const snapshot = SnapshotService.retrocede();
                if (snapshot.blocks != blocks) post.goToSnapshot(snapshot);
            }

            if (ev.ctrlKey && ev.key == "y") {
                ev.preventDefault();
                const snapshot = SnapshotService.advance();
                if (snapshot.blocks != blocks) post.goToSnapshot(snapshot);
            }

            if (ev.key == "Enter") {
                ev.preventDefault();
            }

            if (ev.key == "Backspace") {
                const selection = SelectionService.lastSelection;
                if (!selection) return;

                const {focusNode, anchorNode, focusOffset, anchorOffset} = selection;

                if (selection.type == 'Caret') {
                    const tagElement = focusNode.parentElement as HTMLElement;

                    if (tagElement.innerText.length == 1) {
                        tagElement.dispatchEvent(new Event("removed"));
                        ev.preventDefault();
                    }
                }

                else if (anchorNode == focusNode) {
                    const tagElement = focusNode.parentElement as HTMLElement;
                    const direction = anchorOffset < focusOffset ? 1 : -1;

                    const focusElement = focusNode.parentElement as HTMLElement;
                    const anchorElement = anchorNode.parentElement as HTMLElement;

                    let selectionCoversEntireNode = direction > 0
                        ? focusOffset == focusElement.innerText!.length
                        : anchorOffset == anchorElement.innerText!.length;

                    if (selectionCoversEntireNode) {
                        tagElement.dispatchEvent(new Event("removed"));
                        ev.preventDefault();
                    }
                }

                else if (selection.type == 'Range') {

                    for(let removedElement of selection.fullySelectedTags) {
                        removedElement.dispatchEvent(new Event("removed"));
                    }

                    for(let updatedTag of selection.partiallySelectedTags) {
                        updatedTag.element.dispatchEvent(new CustomEvent("updated", {
                            detail: updatedTag.unselectedContent
                        }))
                    }

                    for(let removedBlock of selection.fullySelectedBlocks) {
                        removedBlock.dispatchEvent(new Event("removed"));
                    }

                    ev.preventDefault();
                }
            }
        };

        window.addEventListener('keydown', handleKeyboardEvent);
        return () => window.removeEventListener('keydown', handleKeyboardEvent);

    }, [blocks]);

    // ============== Once
    useEffect(() => {
        const handleDropEvent = (ev: DragEvent) => {
            ev.preventDefault();
        }

        window.addEventListener('drop', handleDropEvent);

        return () => {
            window.removeEventListener('drop', handleDropEvent);
        }
    }, []);
}