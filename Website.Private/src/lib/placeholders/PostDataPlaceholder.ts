import {BlockType} from "../../pages/editor/types/state/BlockState.ts";
import {TagBackground, TagColor, TagStyle, TagType} from "../../pages/editor/types/state/TagState.ts";
import {TextBlockState} from "../../pages/editor/types/state/block/TextBlockState.ts";

export const postDataPlaceholder = [
    {
        type: BlockType.Text,
        contents: [
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: "O OpenGL é uma "
            },
            {
                type: TagType.Code,
                color: TagColor.Default,
                background: TagBackground.Default,
                content: "API gráfica"
            },
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: " amplamente utilizada no desenvolvimento de jogos e aplicações de computação gráfica. A" +
                    " especificação define uma interface padrão, mas a implementação real de cada função depende da "
            },
            {
                type: TagType.Code,
                color: TagColor.Default,
                background: TagBackground.Default,
                content: "GPU"
            },
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: " e do fabricante da placa de vídeo. Isso significa que, apesar da mesma aplicação utilizar" +
                    " a mesma API, o desempenho e os recursos disponíveis podem variar entre diferentes hardwares."
            },
        ]
    },
    {
        type: BlockType.Text,
        contents: [
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: "Uma das maiores vantagens do OpenGL é sua portabilidade. Como é uma especificação aberta, desenvolvedores podem criar aplicações que rodem em diversos sistemas operacionais, como Windows, macOS e Linux, sem precisar modificar o código. Isso é particularmente útil em um ambiente de desenvolvimento multiplataforma. Ao usar a "
            },
            {
                type: TagType.Code,
                color: TagColor.Default,
                background: TagBackground.Default,
                content: "API OpenGL"
            },
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: " os desenvolvedores podem se concentrar mais na lógica do jogo ou aplicação, ao invés de" +
                    " se preocupar com as especificidades de cada sistema operacional."
            },
        ]
    },
    {
        type: BlockType.Text,
        contents: [
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: "Além da portabilidade, o OpenGL é conhecido por sua flexibilidade. A API oferece uma vasta gama de funções que permitem desde operações básicas de desenho até técnicas avançadas de renderização, como shaders e buffers de profundidade. Esta flexibilidade permite que desenvolvedores criem gráficos extremamente detalhados e realistas. Por exemplo, ao utilizar shaders personalizados, é possível implementar efeitos de iluminação e sombra que aumentam a imersão do usuário."
            },
        ]
    },
    {
        type: BlockType.Text,
        contents: [
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: "O OpenGL também é amplamente suportado por uma vasta gama de ferramentas e bibliotecas auxiliares. Ferramentas como "
            },
            {
                type: TagType.Code,
                color: TagColor.Default,
                background: TagBackground.Default,
                content: "GLUT"
            },
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: " e "
            } ,
            {
                type: TagType.Code,
                color: TagColor.Default,
                background: TagBackground.Default,
                content: "GLEW"
            },
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: " facilitam a inicialização de contextos gráficos e a utilização de extensões específicas" +
                    " do hardware. Essas bibliotecas permitem que os desenvolvedores se concentrem mais na criação dos elementos gráficos e menos nas configurações iniciais e complexas da API. A combinação de OpenGL com essas ferramentas resulta em um fluxo de trabalho mais eficiente."
            },

        ]
    },
    {
        type: BlockType.Text,
        contents: [
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: "No entanto, trabalhar com OpenGL também apresenta desafios. Um deles é a complexidade da própria API, que pode ser intimidante para iniciantes. A documentação detalhada e os tutoriais disponíveis são recursos valiosos, mas ainda assim, a curva de aprendizado pode ser íngreme. Entender conceitos como o pipeline gráfico, buffers, e shaders é essencial para utilizar a "
            },
            {
                type: TagType.Code,
                color: TagColor.Default,
                background: TagBackground.Default,
                content: "API OpenGL"
            },
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: " de maneira eficaz. Assim, muitos desenvolvedores iniciantes optam por começar com" +
                    " bibliotecas de nível mais alto antes de mergulhar no OpenGL."
            },
        ]
    },
    {
        type: BlockType.Text,
        contents: [
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: "Outro aspecto importante do OpenGL é a evolução constante da API. Desde sua criação, a especificação passou por diversas atualizações, adicionando novos recursos e melhorando o desempenho. Por exemplo, a introdução do OpenGL 4.0 trouxe suporte para tessellation, permitindo a criação de superfícies mais detalhadas. Desenvolvedores precisam estar atentos a essas atualizações para tirar proveito dos novos recursos e otimizações disponíveis nas versões mais recentes da "
            },
            {
                type: TagType.Code,
                color: TagColor.Default,
                background: TagBackground.Default,
                content: "API OpenGL."
            },
        ]
    },
    {
        type: BlockType.Text,
        contents: [
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: "A comunidade de desenvolvedores do OpenGL é uma das maiores forças da API. Existem inúmeros fóruns, grupos de discussão e repositórios de código onde desenvolvedores compartilham suas experiências, soluções para problemas comuns e exemplos de código. Essa colaboração ajuda a resolver dúvidas e a disseminar boas práticas no uso da "
            },
            {
                type: TagType.Code,
                color: TagColor.Default,
                background: TagBackground.Default,
                content: "API OpenGL."
            },
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: " Participar dessa comunidade é uma excelente maneira de aprender e se manter atualizado" +
                    " sobre as últimas tendências em desenvolvimento gráfico."
            },
        ]
    },
    {
        type: BlockType.Text,
        contents: [
            {
                type: TagType.Text,
                styles: [ TagStyle.Bold],
                color: TagColor.Default,
                content: "Em resumo, "
            },
            {
                type: TagType.Text,
                styles: [ TagStyle.Default],
                color: TagColor.Default,
                content: "o OpenGL continua a ser uma escolha popular entre desenvolvedores de jogos e aplicações gráficas devido à sua portabilidade, flexibilidade e suporte comunitário. Apesar dos desafios, como a complexidade inicial e a necessidade de se manter atualizado com as novas versões, a API oferece uma base robusta para a criação de gráficos de alta qualidade. Com o uso adequado das ferramentas e bibliotecas auxiliares, os desenvolvedores podem superar esses desafios e aproveitar ao máximo as capacidades da "
            },
            {
                type: TagType.Code,
                color: TagColor.Default,
                background: TagBackground.Default,
                content: "API OpenGL."
            },
        ]
    }
];
