import {BlockState} from "../types/state/BlockState.ts";
import {RefObject, useEffect} from "react";
import {usePostStore} from "../../../store/postStore.ts";
import {TagIdRequestEvent} from "./useTag.ts";
import {TagState, TagType} from "../types/state/TagState.ts";
import {v4 as v4uuid} from "uuid";
import {SelectionObserver} from "../misc/SelectionObserver.ts";

export default function useBlock(currentBlock: BlockState, ref: RefObject<HTMLDivElement>) {
    const post = usePostStore((state) => ({
        removeTags: state.removeTags,
        insertTags: state.insertTags,
        setCaretPosition: state.setCaretPosition
    }))

    useEffect(() => {
        const blockElement = ref.current;

        if (blockElement) {
            blockElement.setAttribute("editor-block-element", currentBlock.type.toString());

            const observer = new MutationObserver(async (mutations: MutationRecord[]) => {
                observer.disconnect();
                const nodesToAdd: Node[] = [];
                const tagsToAdd: TagState[] = [];

                const nodesToRemove: Node[] = [];
                const tagIdsToRemove: any[] = [];

                for (let mutation of mutations) {
                    if (mutation.type == "childList") {
                        for (let removedNode of mutation.removedNodes) nodesToRemove.push(removedNode)
                        for (let addedNode of mutation.addedNodes) nodesToAdd.push(addedNode);
                    }
                }

                for (let removedNode of nodesToRemove) {
                    const tagId: any = await new Promise<string>((res) => {
                        const event = new CustomEvent<TagIdRequestEvent>("tagid", {
                            detail: {
                                parentBlock: currentBlock.id,
                                accept: (tagId: string) => res(tagId)
                            }
                        });

                        removedNode.dispatchEvent(event);
                    })

                    blockElement?.appendChild(removedNode);
                    tagIdsToRemove.push(tagId);
                }

                if (tagIdsToRemove.length > 0) post.removeTags(currentBlock.id, tagIdsToRemove);

                for (let addedNode of nodesToAdd) {
                    const tagTypeAtt = (addedNode as Element).getAttribute("editor-tag-element");
                    const addedTagCount = tagsToAdd.length;
                    const content = addedNode.textContent;

                    if (tagTypeAtt == null) {
                        if(addedTagCount > 0) {
                            const lastTag = tagsToAdd[addedTagCount - 1];

                            if(lastTag.type == TagType.Text) {
                                lastTag.content += content;
                            }

                            else {
                                tagsToAdd.push({
                                    id: v4uuid(),
                                    content: content,
                                    type: TagType.Text,
                                });
                            }
                        }

                        else {
                            tagsToAdd.push({
                                id: v4uuid(),
                                content: content,
                                type: TagType.Text,
                            });
                        }
                    }

                    else {
                        const tagType: TagType = parseInt(tagTypeAtt);

                        if(addedTagCount > 0) {
                            const lastTag = tagsToAdd[addedTagCount - 1];

                            if(lastTag.type == tagType) {
                                lastTag.content += content;
                            }

                            else {
                                tagsToAdd.push({
                                    id: v4uuid(),
                                    content: addedNode.textContent,
                                    type: tagType
                                });
                            }
                        }

                        else {
                            tagsToAdd.push({
                                id: v4uuid(),
                                content: addedNode.textContent,
                                type: tagType
                            });
                        }
                    }
                }

                if(nodesToAdd.length > 0) {
                    const startNode: ChildNode | null = nodesToAdd[0].previousSibling;

                    if(startNode) {
                        const tagId: any = await new Promise<string>((res) => {
                            const event = new CustomEvent<TagIdRequestEvent>("tagid", {
                                detail: {
                                    parentBlock: currentBlock.id,
                                    accept: (tagId: string) => res(tagId)
                                }
                            });

                            startNode.dispatchEvent(event);
                        })

                        post.insertTags(currentBlock.id, tagId, tagsToAdd);
                    }

                    else {
                        post.insertTags(currentBlock.id, null, tagsToAdd);
                    }
                }

                // Reposicionamento
                const lastSelection = SelectionObserver.lastSelection;
                if(lastSelection) {
                    if(lastSelection.type == "Caret") {
                        const offset = lastSelection.focusOffset;
                        const prevElement = lastSelection.focusNode.previousSibling;
                    }

                    else {
                        const isLeftToRight = lastSelection.anchorOffset < lastSelection.focusOffset;

                        if(isLeftToRight) {
                            const prevElement = lastSelection.anchorNode.previousSibling;
                        }

                    }
                }

                for(let node of nodesToAdd) {
                    try {
                        blockElement.removeChild(node);
                    }

                    catch (e) {
                        
                    }
                }
            })

            observer.observe(blockElement, {
                childList: true
            })

            return () => {
                observer.disconnect();
            }
        }
    }, [currentBlock]);
}