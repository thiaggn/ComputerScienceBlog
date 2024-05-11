import {RefObject, useEffect} from "react";
import {usePostStore} from "../../../store/postStore.ts";
import {PostState} from "../types/texteditor/PostState.ts";
import {EditablePostProvider} from "../../../lib/providers/EditablePostProvider.ts";
import {SelectionObserver} from "../SelectionObserver.ts";
import {SnapshotManager} from "../SnapshotManager.ts";
import {BlockState} from "../types/texteditor/BlockState.ts";

export default function useEditor(ref: RefObject<HTMLDivElement>, blocks: BlockState[]) {

    const post = usePostStore(state => ({
        goToSnapshot: state.goToSnapshot
    }))

    useEffect(() => {
        const element = ref.current;

        if (element) {
            const handleInput = () => {
                const selection = document.getSelection();
                const caretPosition = SelectionObserver.nextCaretPosition;

                if (caretPosition && selection) {
                    selection.setPosition(caretPosition.node, caretPosition.offset);
                }
            }

            element.addEventListener("input", handleInput);
            element.setAttribute("editor-element", "");

            return () => element.removeEventListener('input', handleInput);
        }
    });

    useEffect(() => {
        const handleKeyboardEvent = (ev: KeyboardEvent) => {
            if (ev.ctrlKey && ev.key == "z") {
                ev.preventDefault();
                const snapshot = SnapshotManager.retrocede();
                if (snapshot.blocks != blocks) post.goToSnapshot(snapshot);

            }

            if (ev.ctrlKey && ev.key == "y") {
                ev.preventDefault();
                const snapshot = SnapshotManager.advance();
                if (snapshot.blocks != blocks) post.goToSnapshot(snapshot);
            }

            if (ev.key == "Enter") {
                ev.preventDefault();
            }

            if (ev.key == "Backspace") {
                const selection = SelectionObserver.lastSelection;
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

                    let selectionCoversEntireNode = direction > 0
                        ? focusOffset == focusNode.textContent!.length
                        : anchorOffset == focusNode.textContent!.length;

                    if (selectionCoversEntireNode) {
                        tagElement.dispatchEvent(new Event("removed"));
                        ev.preventDefault();
                    }
                }

                else if (selection.type == 'Range') {
                    for(let removedElement of selection.fullySelectedTags) {
                        removedElement.dispatchEvent(new Event("removed"));
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyboardEvent);
        return () => window.removeEventListener('keydown', handleKeyboardEvent);

    }, [blocks]);

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