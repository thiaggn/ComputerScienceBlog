import {BlockState} from "../types/texteditor/BlockState.ts";
import {RefObject, useEffect} from "react";
import {usePostStore} from "../../../store/postStore.ts";
import {TagIdRequestEvent} from "./useTag.ts";
import {TagState, TagType} from "../types/texteditor/TagState.ts";
import {v4 as v4uuid} from "uuid";
import {SelectionObserver} from "../SelectionObserver.ts";

export default function useBlock(currentBlock: BlockState, ref: RefObject<HTMLDivElement>) {
    const post = usePostStore((state) => ({
        removeTags: state.removeTags,
        insertTags: state.insertTags,
        setCaretPosition: state.setCaretRecord
    }))

    useEffect(() => {
        const blockElement = ref.current;

        if (blockElement) {
            blockElement.setAttribute("editor-block-element", currentBlock.type.toString());

            const observer = new MutationObserver(async (mutations: MutationRecord[], observer) => {

            });

            observer.observe(blockElement, {
                childList: true
            })

            return () => {
                observer.disconnect();
            }
        }
    }, [currentBlock]);
}