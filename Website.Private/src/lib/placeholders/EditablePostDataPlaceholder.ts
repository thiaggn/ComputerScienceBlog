import {BlockType} from "../../pages/editor/types/data/BlockState.ts";
import {TagType} from "../../pages/editor/types/data/TagState.ts";
import {PostData} from "../../pages/editor/types/data/PostData.ts";


export const EditablePostDataPlaceholder: PostData = {
    title: "Introdução ao OpenGL",

    blocks: [
        {
            type: BlockType.Text,
            contents: [
                {type: TagType.Text, content: "OpenGL é uma "},
                {type: TagType.Bold, content: "API gráfica"},
                {type: TagType.Text, content: " multiplataforma utilizada para renderização de gráficos 2D e 3D."}
            ]
        },
        {
            type: BlockType.Text,
            contents: [
                {type: TagType.Text, content: "Com o OpenGL, os desenvolvedores podem criar aplicativos "},
                {type: TagType.Italic, content: "interativos"},
                {type: TagType.Text, content: " que exibem imagens de alta qualidade e renderizam cenas complexas em tempo real. "}
            ]
        },
        {
            type: BlockType.Text,
            contents: [
                {type: TagType.Text, content: "Ele oferece acesso direto à "},
                {type: TagType.Code, content: "GPU"},
                {type: TagType.Text, content: ", permitindo um desempenho otimizado ao processar grandes quantidades de dados gráficos. "}
            ]
        },
        {
            type: BlockType.Text,
            contents: [
                {type: TagType.Text, content: "Além disso, o OpenGL é amplamente utilizado em uma variedade de" +
                        " campos, incluindo jogos, simulações, visualização científica e design de "},
                {type: TagType.Bold, content: "CAD"},
                {type: TagType.Text, content: " (Computer-Aided Design). "}
            ]
        },
        {
            type: BlockType.Text,
            contents: [
                {type: TagType.Text, content: "Sua versatilidade e poder tornam o OpenGL uma escolha popular entre os desenvolvedores de software gráfico, oferecendo uma base sólida para criar "},
                {type: TagType.Italic, content: "aplicações visuais"},
                {type: TagType.Text, content: " impressionantes. "}
            ]
        },
        {
            type: BlockType.Text,
            contents: [
                {type: TagType.Text, content: "No entanto, dominar o OpenGL pode ser um desafio, especialmente para iniciantes. "}
            ]
        },
        {
            type: BlockType.Text,
            contents: [
                {type: TagType.Text, content: "Felizmente, existem muitos recursos disponíveis, como tutoriais, documentação oficial e comunidades online, para ajudar os aspirantes a "},
                {type: TagType.Text, content: "desenvolvedores a aprenderem e dominarem essa poderosa "},
                {type: TagType.Bold, content: "API gráfica."}
            ]
        }
    ]
}
