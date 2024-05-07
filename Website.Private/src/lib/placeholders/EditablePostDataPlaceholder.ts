import {BlockType} from "../../pages/editor/types/item/BlockItem.ts";
import {TagType} from "../../pages/editor/types/item/TagItem.ts";
import {PostData} from "../../pages/editor/types/data/PostData.ts";

export const EditablePostDataPlaceholder: PostData = {
    id: "postB",
    title: "Introdução ao OpenGL",

    blocks: [
        {
            id: "blockA",
            type: BlockType.Text,
            tags: [
                {type: TagType.Text, content: "OpenGL é uma "},
                {type: TagType.Bold, content: "API gráfica"},
                {type: TagType.Text, content: " multiplataforma utilizada para renderização de gráficos 2D e 3D. "}
            ]
        },
        {
            id: "blockB",
            type: BlockType.Text,
            tags: [
                {type: TagType.Text, content: "Com o OpenGL, os desenvolvedores podem criar aplicativos "},
                {type: TagType.Italic, content: "interativos"},
                {type: TagType.Text, content: " que exibem imagens de alta qualidade e renderizam cenas complexas em tempo real. "}
            ]
        },
        {
            id: "blockC",
            type: BlockType.Text,
            tags: [
                {type: TagType.Text, content: "Ele oferece acesso direto à "},
                {type: TagType.Code, content: "GPU"},
                {type: TagType.Text, content: ", permitindo um desempenho otimizado ao processar grandes quantidades de dados gráficos. "}
            ]
        },
        {
            id: "blockD",
            type: BlockType.Text,
            tags: [
                {type: TagType.Text, content: "Além disso, o OpenGL é amplamente utilizado em uma variedade de" +
                        " campos, incluindo jogos, simulações, visualização científica e design de "},
                {type: TagType.Bold, content: "CAD"},
                {type: TagType.Text, content: " (Computer-Aided Design). "}
            ]
        },
        {
            id: "blockE",
            type: BlockType.Text,
            tags: [
                {type: TagType.Text, content: "Sua versatilidade e poder tornam o OpenGL uma escolha popular entre os desenvolvedores de software gráfico, oferecendo uma base sólida para criar "},
                {type: TagType.Italic, content: "aplicações visuais"},
                {type: TagType.Text, content: " impressionantes. "}
            ]
        },
        {
            id: "blockF",
            type: BlockType.Text,
            tags: [
                {type: TagType.Text, content: "No entanto, dominar o OpenGL pode ser um desafio, especialmente para iniciantes. "}
            ]
        },
        {
            id: "blockG",
            type: BlockType.Text,
            tags: [
                {type: TagType.Text, content: "Felizmente, existem muitos recursos disponíveis, como tutoriais, documentação oficial e comunidades online, para ajudar os aspirantes a "},
                {type: TagType.Text, content: "desenvolvedores a aprenderem e dominarem essa poderosa "},
                {type: TagType.Bold, content: "API gráfica."}
            ]
        }
    ]
}
