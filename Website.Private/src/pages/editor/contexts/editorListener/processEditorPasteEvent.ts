import {List} from "immutable";
import {TagItem, TagType} from "../../types/item/TagItem.ts";
import {EditorItem, ItemRole} from "../../types/item/EditorItem.ts";
import {BlockItem} from "../../types/item/BlockItem.ts";

function toElement(html: string) {
    const div = document.createElement('div');
    div.innerHTML = html.trim();
    return div.children;
}
export const processEditorPasteEvent = async (ev: ClipboardEvent) => {
    ev.preventDefault();
    const htmlstr = ev.clipboardData?.getData("text/html") || "";

    const tagsToAdd = List<TagItem>().withMutations((tags) => {
        const pastedEditorItems: EditorItem[] = [];

        if (htmlstr) {
            const elements = toElement(htmlstr);

            for (let element of elements) {
                const tag = element as HTMLElement;

                const editorItem = tag.getAttribute("editorListener-item")?.split(".")?.map(i => parseInt(i)) || null;

                if (editorItem) {
                    const role: ItemRole = editorItem[0];
                    const type = editorItem[1];

                    switch (role) {
                        case ItemRole.Tag:
                            pastedEditorItems.push(TagItem.create({
                                type: type,
                                content: tag.innerText
                            }));

                            break;

                        case ItemRole.Block:
                            pastedEditorItems.push(BlockItem.create({
                                type: type,
                                tags: []
                            }))
                            break;

                        case ItemRole.Column:
                            break;
                    }
                }

                else pastedEditorItems.push(TagItem.create({
                    type: TagType.Text,
                    content: tag.innerText
                }));
            }
        }

        console.log(pastedEditorItems);
    });
}