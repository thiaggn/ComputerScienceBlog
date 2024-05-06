import {PostData} from "../../pages/editor/types/PostTypes.ts";
import {BlockType} from "../../pages/editor/types/BlockTypes.ts";
import {TagType} from "../../pages/editor/types/TagTypes.ts";

export const EditablePostDataPlaceholder: PostData = {
    id: "postA",
    title: "Aprendendo HTML",

    blocks: [
        {
            id: "blockA",
            type: BlockType.Text,

            tags: [
                {type: TagType.Text, content: "A tag "},
                {type: TagType.Code, content: "<div> "},
                {type: TagType.Text, content: " representa uma divisória."}
            ]
        },
        {
            id: "blockB",
            type: BlockType.Text,
            tags: [
                {type: TagType.Text, content: "A tag "},
                {type: TagType.Code, content: "<b> "},
                {type: TagType.Text, content: " torna o texto dentro dela negrito."}
            ]
        }
    ]
}
