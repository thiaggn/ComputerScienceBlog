import {BlockType, PostData, TagType} from "../../pages/editor/types/EditorTypes.ts";

export const EditablePostDataPlaceholder: PostData = {
    blocks: [
        {
            type: BlockType.Text,

            tags: [
                {type: TagType.Text, content: "A tag "},
                {type: TagType.Code, content: "<div> "},
                {type: TagType.Text, content: " representa uma divisória."}
            ]
        },
        {
            type: BlockType.Text,
            tags: [
                {type: TagType.Text, content: "A tag "},
                {type: TagType.Code, content: "<b> "},
                {type: TagType.Text, content: " torna o texto dentro dela negrito."}
            ]
        }
    ]
}
