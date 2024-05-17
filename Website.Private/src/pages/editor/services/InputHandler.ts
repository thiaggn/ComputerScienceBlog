import {SelectionEvent} from "../misc/SelectionEvent.ts";
import {TagState, TagType} from "../types/state/TagState.ts";
import {usePostStore} from "../PostStore.ts";
import {SelectionRecord} from "../misc/SelectionRecord.ts";
import {SelectionMode} from "../misc/SelectionMode.ts";
import {BlockState} from "../types/state/BlockState.ts";

export type InputDetails<T extends Event> = {
    selection: SelectionEvent,
    event: T,
}

export class InputHandler {
    private static nextCaretPosition: SelectionRecord | null;

    public static consumeNextSelection() {
        const selection = document.getSelection();
        const nextSelection = InputHandler.nextCaretPosition;
        InputHandler.nextCaretPosition = null;

        if (selection && nextSelection) {
            const startElement = document.getElementById(`${nextSelection.startTagId}`);
            const endElement = document.getElementById(`${nextSelection.startTagId}`);

            if (startElement && endElement) {
                const startEditable = startElement.querySelector("[editor-editable]");
                const endEditable = endElement.querySelector("[editor-editable]");
                if (startEditable && endEditable) {
                    selection.setBaseAndExtent(
                        startEditable.firstChild!,
                        nextSelection.startOffset,
                        endEditable.firstChild!,
                        nextSelection.endOffset
                    )
                }

            } else throw new Error()
        }
    }

    private setTagAsEmpty(selection: SelectionEvent, additionalOffset = 0) {
        const startPoint = selection.start;

        InputHandler.nextCaretPosition = SelectionRecord.createCollapsed(
            startPoint.tag.id, startPoint.offset + additionalOffset
        );

        const newTag = startPoint.tag.createCopy((tag: TagState) => {
            tag.content = " "
            tag.empty = true;
        });

        usePostStore.getState().updateTag(newTag);
    }


    public handleCaretBackspace(input: InputDetails<KeyboardEvent>) {
        const startPoint = input.selection.start;
        const isTextTag = startPoint.tag.type == TagType.Text;
        const willDeleteRemainingCharacter = startPoint.unselectedText.length == 1;

        if ((willDeleteRemainingCharacter) || startPoint.tag.empty) {
            if (isTextTag) {
                const nextTag = startPoint.tag.next as TagState;
                const prevTag = startPoint.tag.prev as TagState;

                if(nextTag && prevTag && nextTag.type == prevTag.type) {
                    InputHandler.nextCaretPosition = SelectionRecord.createCollapsed(
                        prevTag.id,
                        prevTag.content.length + nextTag.content.length - 2
                    )
                }

                usePostStore.getState().removeTags(startPoint.tag, undefined, true);
            }
            else this.setTagAsEmpty(input.selection);
            input.event.preventDefault();
        }
    }

    public handleCaretDelete(input: InputDetails<KeyboardEvent>) {
        const startPoint = input.selection.start;

        if (startPoint.tag.empty) {
            usePostStore.getState().removeTags(startPoint.tag);
            input.event.preventDefault();
        }
    }

    public handleRangeBackspaceOrDelete(input: InputDetails<Event>) {
        const startPoint = input.selection.start;
        const endPoint = input.selection.end;

        if (input.selection.sameElement) {
            const willDeleteEntireTag = startPoint.unselectedText.length == 0;

            if (willDeleteEntireTag) {
                input.event.preventDefault();

                if (startPoint.tag.type == TagType.Text) {
                    usePostStore.getState().removeTags(startPoint.tag);
                }

                else {
                    this.setTagAsEmpty(input.selection, 1);
                }
            }
        }

        else if(startPoint.block == endPoint.block) {
            let startPointWasDeleted = startPoint.unselectedText.length == 0;
            let endPointWasDeleted = endPoint.unselectedText.length == 0;

            let tagAfterStart = startPoint.tag.next as TagState | undefined;
            let tagBeforeEnd = endPoint.tag.prev as TagState | undefined;

            if(tagAfterStart == endPoint.tag) tagAfterStart = undefined;

            if(startPoint.tag.type == endPoint.tag.type) {
                InputHandler.nextCaretPosition = SelectionRecord.createCollapsed(
                    startPoint.tag.id,
                    startPoint.offset
                )
            }

            if (!startPointWasDeleted) usePostStore.getState().updateTag(
                startPoint.tag.createCopy(newTag => {newTag.content = startPoint.unselectedText;}
                ));

            if (!endPointWasDeleted) usePostStore.getState().updateTag(
                endPoint.tag.createCopy(newTag => {newTag.content = endPoint.unselectedText;}
                ));

            const removalStart = startPointWasDeleted ? startPoint.tag : tagAfterStart;
            const removalEnd = endPointWasDeleted ? endPoint.tag : tagBeforeEnd;

            if(removalStart) usePostStore.getState().removeTags(removalStart, removalEnd);

            input.event.preventDefault();
        }

        else {
            // Bloco do início
            const startBlock = startPoint.block;
            const startTagWasDeleted = startPoint.unselectedText.length == 0;

            if (!startTagWasDeleted) usePostStore.getState().updateTag(
                startPoint.tag.createCopy(newTag => {
                    newTag.content = startPoint.unselectedText
                }));

            const s_removalStart = startTagWasDeleted ? startPoint.tag : startPoint.tag.next as TagState | undefined;
            const s_removalEnd = startBlock.contents[startBlock.contents.length - 1] as TagState;
            if (s_removalStart) usePostStore.getState().removeTags(s_removalStart, s_removalEnd);

            // Bloco do final
            const endBlock = endPoint.block;
            const endTagWasDeleted = endPoint.unselectedText.length == 0;

            if (!endTagWasDeleted) usePostStore.getState().updateTag(
                endPoint.tag.createCopy(newTag => {
                    newTag.content = endPoint.unselectedText;
                })
            )

            const e_removalStart = endBlock.contents[0] as TagState;
            const e_removalEnd = endTagWasDeleted ? endPoint.tag : endPoint.tag.prev as TagState | undefined;
            if(e_removalStart != endPoint.tag) {
                usePostStore.getState().removeTags(e_removalStart, e_removalEnd);
            }

            // Blocos do meio
            const b_removalStart = startBlock.next;
            const b_removalEnd = endBlock.prev;

            if(b_removalEnd != startBlock && b_removalStart) {
                usePostStore.getState().removeBlocks(b_removalStart, b_removalEnd);
            }

            usePostStore.getState().mergeBlocks(startBlock.id, endBlock.id);

            input.event.preventDefault()
        }
    }

    public handleSingleCharacterInput(input: InputDetails<Event>) {
        const startPoint = input.selection.start;
        const isEmpty = startPoint.tag.empty ? 1 : 0;

        const newTag = startPoint.tag.createCopy((tag: TagState) => {
            if (isEmpty) tag.content = startPoint.unselectedText.slice(1);
            else tag.content = startPoint.unselectedText;
        })

        InputHandler.nextCaretPosition = SelectionRecord.createCollapsed(
            startPoint.tag.id, startPoint.offset - isEmpty
        );

        usePostStore.getState().updateTag(newTag);
    }

    public handleEnter(input: InputDetails<KeyboardEvent>) {

    }
}

