import {BlockState} from "../types/texteditor/BlockState.ts";
import {RefObject, useEffect} from "react";
import {usePostStore} from "../../../store/postStore.ts";

export default function useBlock(currentBlock: BlockState, ref: RefObject<HTMLDivElement>) {

    const removeBlocks = usePostStore(state => state.removeBlocks);

    useEffect(() => {
        const blockElement = ref.current;

        if (blockElement) {
            blockElement.setAttribute("editor-block-element", currentBlock.type.toString());

            const observer = new MutationObserver(async (mutations: MutationRecord[], observer) => {

            });

            observer.observe(blockElement, {
                childList: true
            })

            const handleRemoval = () => {
                removeBlocks([currentBlock.id]);
            }

            blockElement.addEventListener("removed", handleRemoval);

            return () => {
                blockElement.removeEventListener("removed", handleRemoval);
                observer.disconnect();
            }
        }
    }, [currentBlock]);
}