import s from "../styles/EditorLayout.module.scss";
import {BlockItem, BlockType, TagItem, TagType} from "../lib/types/EditorTypes.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {FormEvent} from "react";
import {API} from "../lib/API.ts";

const options = {
    contentEditable: true,
    suppressContentEditableWarning: true

}
export default function EditorLayout() {
    return <div className={s.editor}>
        <TextEditor/>
    </div>
}

// Editor Component
// ================================================
function TextEditor() {

    // Use para invalidar queries
    const queryClient = useQueryClient();


    const editablePostQuery = useQuery({
        // /editablePost                => ["editablePost"]
        // /editablePost/1              => ["editablePost", postId]
        // /editablePost?authorId=1     => ["editablePost", {authorId: 1}]
        // /editablePost/2/comments     => ["editablePost", postId, "comments"]

        queryKey: ["editablePost"],
        queryFn: () => API.getEditablePost("1")
    });

    const editablePostAuthorQuery = useQuery({
        // Faz com que essa query seja carregada só dps q a query anterior tenha sido carregada
        enabled: editablePostQuery.data?.id != null,
        queryKey: ["editablePost", editablePostQuery.data?.id],
        queryFn: () => "Thiago"
    });

    const editablePostMutation = useMutation({
        mutationFn: async (content: string) => API.addBlockToEditablePost({
            type: BlockType.Text,
            tags: [{type: TagType.Text, content}]
        }),

        // You can omit this if you think data doesn't need to be re fetched
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["editablePost"],
            });
        }
    });

    
    // editablePostquery.fetchStatus = "fetching"           very first mount
    // editablePostQuery.status      = "loading"            very first mount

    // editablePostQuery.fetchStatus = "idle"               not fetching
    // editablePost.status           = "success" | "error"

    // editablePostQuery.fetchStatus = "paused"   was in the process of fetching and couldn't finish

    /* If you go ahead and fetch again, and it already had a "success", it will stay
    *  as "success" but your fetchStatus will change to fetching. */

    if (editablePostQuery.isLoading) {
        return <h1>Carregando</h1>
    }

    if (editablePostQuery.isError) {
        return <>
            <h1>Erro!</h1>
            <pre>{editablePostQuery.error.message}</pre>
        </>
    }

    return <div className={s.textarea}>
        {editablePostQuery.data?.blocks.map(block =>
            <Block key={block.id} block={block}/>
        )}

        <button onClick={() => editablePostMutation.mutate(new Date().toDateString())}>New block</button>
    </div>
}

// Block Component
// ================================================
function Block({block}: { block: BlockItem }) {
    const handleInput = (ev: FormEvent<HTMLDivElement>) => {
        const selection = window.getSelection();
    }

    return <div editor-block-id={block.id} onInput={handleInput} className={s.block} {...options}>
        {block.tags.map((tag) => <Tag key={tag.id} tag={tag}/>)}
    </div>
}

// Tag Component
// ================================================
function Tag({tag}: { tag: TagItem }) {

    switch (tag.type) {
        case TagType.Text:
            return <div editor-tag-id={tag.id} className={s.text}>{tag.content}</div>

        case TagType.Code:
            return <div editor-tag-id={tag.id} className={s.code}>{tag.content}</div>
    }
}