import {useContext, useEffect, useState} from "react";
import {EditorListener} from "../contexts/editorListener/EditorListener.ts";
import {EditorListenerCallback} from "../contexts/editorListener/createEditorListener.ts";
import {PostItem} from "../types/item/PostItem.ts";
import {EditablePostProvider} from "../../../lib/providers/EditablePostProvider.ts";
import {SelectionListener} from "../contexts/editorListener/SelectionListener.ts";

export function useEditorPost(postId: string) {
    const context = useContext(EditorListener);
    if(context === undefined) throw new Error("UseEditorListener context was not properly initialized");

    const [post, setPost] = useState<PostItem>();

    useEffect(() => {
        const fetchPost = async () => {
            setPost(await EditablePostProvider.get("1"));
        }

        fetchPost();

        return () => context.removeListener();
    }, []);

    useEffect(() => {
        context.getCaretMoveCommand()?.execute();

        context.setListener((events) => {
            for(let event of events) {
                setPost(prev => prev?.updateBlocks(event.block));
            }

            console.log("Updated", events);
        });



    }, [post]);

    return post;
}

