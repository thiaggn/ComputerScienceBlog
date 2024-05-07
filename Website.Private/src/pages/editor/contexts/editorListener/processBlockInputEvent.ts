import {SelectionListener} from "./SelectionListener.ts";
import {BlockTarget, TagTarget} from "./types/Targets.ts";
import {EditorEventAction, EditorEventData} from "./types/EditorEventData.ts";
import {TagItem} from "../../types/item/TagItem.ts";

export default function processBlockInputEvent(
    ev: Event,
    tags: ReadonlyMap<object, TagTarget>,
    blocks: ReadonlyMap<object, BlockTarget>
) {
    const updates: EditorEventData[] = [];
    const lastSelection = SelectionListener.getLastSelection();
    const anchor = lastSelection.anchorNode.parentElement;
    const focus = lastSelection.focusNode.parentElement;

    if(!anchor || !focus) throw new Error();

    // Single tag update
    if(lastSelection.isCollapsed) {
        // Obtém o bloco que foi modificado:
        const modifiedBlockTarget = blocks.get(ev.target as HTMLElement);
        if(!modifiedBlockTarget) throw new Error("BlockTarget object for block element was not found.");
        const oldBlockItem = modifiedBlockTarget.item;

        // Obtém a tag modificada
        const modifiedTagTarget = tags.get(focus);
        if(!modifiedTagTarget) throw new Error("TagTarget object for tag element was not found.");
        const oldTagItem = modifiedTagTarget.item;

        // Obtém o novo valor da tag
        const newContent: string = focus.innerText;

        // Cria uma tag nova, atualizada com o novo valor
        const newTagItem = TagItem.create({
            id: oldTagItem.id,
            type: oldTagItem.type,
            content: newContent,
        })

        // Gera um bloco novo, contendo a tag atualizada
        const newBlockItem = oldBlockItem.updateTags(newTagItem);

        updates.push({
            action: EditorEventAction.Update,
            block: newBlockItem,
        });
    }

    return updates;
}












        // // Obtém a tag irmã da tag modificada
        // const siblingElement = focus.nextSibling;
        // let siblingId: string | undefined;
        //
        // if(siblingElement) {
        //     let tagTarget = tags.get(siblingElement);
        //     if(!tagTarget) throw new Error("Tag element exists but it's TagTarget object was not found");
        //     siblingId = tagTarget.item.id;
        // }
