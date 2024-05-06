import s from "../../styles/EditorLayout.module.scss";
import {Editor} from "./components/Editor.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {API} from "../../lib/API.ts";
import {BlockUpdateAction, BlockUpdateData} from "./types/BlockUpdateData.ts";
import {useDebounce} from "../../hooks/useDebounce.tsx";
import {Map} from "immutable";
import {useEffect, useState} from "react";
import {BlockItem, PostItem} from "./types/EditorTypes.ts";

export default function EditorPage() {

    const postQuery = useQuery({
        queryKey: ["page"],
        queryFn: () => API.getEditablePost("1")
    });

    const postMutator = useMutation({
        mutationKey: ["page"],
        mutationFn: async (updates: BlockUpdateData[]) => {
            console.log("[!] Sent update blocks to the server!");
            return updates;
        },
    });

    const queryClient = useQueryClient();
    const [blockUpdates, setBlockUpdates] = useState(Map<string, BlockUpdateData>());
    const debouncedBlockUpdates = useDebounce(blockUpdates, 5000);

    useEffect(() => {
        if (debouncedBlockUpdates.size > 0) {
            const updates = debouncedBlockUpdates.valueSeq().toArray();
            postMutator.mutateAsync(updates);
            setBlockUpdates(blockUpdates.clear());
        }
    }, [debouncedBlockUpdates]);

    const handleUpdate = (incomingUpdates: BlockUpdateData[]) => {

        queryClient.setQueryData(["page"], (prev: PostItem) => {
            prev.blocks = prev.blocks.withMutations((blocks: Map<string, BlockItem>) => {
                for (let {action, block} of incomingUpdates) {
                    switch (action) {
                        case BlockUpdateAction.Set:
                            blocks.set(block!.id, block!);
                            break;
                    }
                }
            })

            return {...prev};
        });

        setBlockUpdates((prevUpdates: Map<string, BlockUpdateData>) =>
            prevUpdates.withMutations(((updates: Map<string, BlockUpdateData>) => {
                for (let update of incomingUpdates) {
                    updates.set(update.block!.id, update);
                }
            }))
        );
    }


    if (postQuery.isLoading || postQuery.isError) return <div>pending</div>

    return <div className={s.editor}>
        <Editor postItem={postQuery.data!} onUpdate={handleUpdate}/>
    </div>
}