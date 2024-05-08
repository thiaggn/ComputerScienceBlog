import {SelectionListener} from "./SelectionListener.ts";
import {BlockTarget, TagTarget} from "./types/Targets.ts";
import {EditorEventAction, EditorEventData} from "./types/EditorEventData.ts";
import {TagItem} from "../../types/item/TagItem.ts";
import {CaretMoveCommand} from "./CaretMoveCommand.ts";

let lastTagRef: any;
export default function processBlockInputEvent(
    ev: Event,
    tags: Map<object, TagTarget>,
    blocks: Map<object, BlockTarget>
) {

    const updates: EditorEventData[] = [];
    let command: CaretMoveCommand;

    const lastSelection = SelectionListener.getLastSelection();
    const anchor = lastSelection.anchorNode.parentElement;
    const focus = lastSelection.focusNode.parentElement;

    if (!anchor || !focus) throw new Error();

    // Single tag update
    if (anchor === focus) {
        // Obtém o bloco que foi modificado:
        const modifiedBlockTarget = blocks.get(ev.target as HTMLElement);
        if (!modifiedBlockTarget) throw new Error("BlockTarget object for block element was not found.");
        const oldBlockItem = modifiedBlockTarget.item;

        // Obtém a tag modificada
        const modifiedTagTarget = tags.get(focus);
        if (!modifiedTagTarget) throw new Error("TagTarget object for tag element was not found.");
        const oldTagItem = modifiedTagTarget.item;

        // Obtém o novo valor da tag
        const newContent: string = focus.innerText;

        // Cria uma tag nova, atualizada com o novo valor
        const newTagItem = TagItem.create({
            id: oldTagItem.id,
            type: oldTagItem.type,
            content: newContent,
        })

        const newBlockItem = oldBlockItem.updateTags(newTagItem);

        updates.push({
            action: EditorEventAction.Update,
            block: newBlockItem,
        });

        if(lastSelection.type === "Caret") {
            command = CaretMoveCommand.forCollapsed(newTagItem.content.length - oldTagItem.content.length);
        }

        else if(lastSelection.type === "Range") {
            const {anchorOffset, focusOffset} = lastSelection;
            let offset: number;

            if(anchorOffset < focusOffset) offset = anchorOffset
            else offset = focusOffset;

            command = CaretMoveCommand.forRangeWithinSameElement(lastSelection.anchorOffset);
        }
    }

    return {
        updates: updates,
        command: command!,
    };
}
