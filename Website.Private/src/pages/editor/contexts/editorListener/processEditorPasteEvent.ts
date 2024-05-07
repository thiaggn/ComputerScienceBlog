import {List} from "immutable";
import {TagItem, TagType} from "../../types/item/TagItem.ts";
import {EditorItem, ItemRole} from "../../types/item/EditorItem.ts";
import {BlockItem} from "../../types/item/BlockItem.ts";

function toElement(html: string) {
    const div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.children;
}

export async function processEditorPasteEvent(ev: ClipboardEvent): Promise<EditorItem[]> {

    ev.preventDefault();
    const htmlstr = ev.clipboardData?.getData("text/html") || "";

    const newEditorItems: EditorItem[] = [];

    if (htmlstr) {
        const elements = toElement(htmlstr);

        for (let element of elements) {
            const tag = element as HTMLElement;

            const editorItem = tag.getAttribute("editorListener-item")?.split(".")?.map(i => parseInt(i)) || null;

            if (editorItem) {
                const [role, type] = editorItem;

                switch (role) {
                    case ItemRole.Tag:
                        newEditorItems.push(TagItem.create({
                            type: type,
                            content: tag.innerText
                        }));
                        break;

                    case ItemRole.Block:
                        newEditorItems.push(BlockItem.create({
                            type: type,
                            tags: []
                        }))
                        break;

                    case ItemRole.Column:
                        break;
                }
            }

            else newEditorItems.push(TagItem.create({
                type: TagType.Text,
                content: tag.innerText
            }));
        }
    }

    console.log("[!] Processed editor paste event", newEditorItems);
    return newEditorItems;
}