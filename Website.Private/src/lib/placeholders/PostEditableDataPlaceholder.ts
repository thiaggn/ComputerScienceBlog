import {List} from "immutable";
import {BlockType, PostData, TagType} from "../types/EditorTypes.ts";

export const PostEditableDataPlaceholder: PostData = {
    blocks: List([
        {
            type: BlockType.Text,

            tags: List([
                {type: TagType.Text, content: "A tag "},
                {type: TagType.Code, content: "<div> "},
                {type: TagType.Text, content: " representa uma divisória."}
            ])
        },
        {
            type: BlockType.Text,
            tags: List([
                {type: TagType.Text, content: "A tag "},
                {type: TagType.Code, content: "<b> "},
                {type: TagType.Text, content: " torna o texto dentro dela negrito."}
            ])
        }
    ])
}
