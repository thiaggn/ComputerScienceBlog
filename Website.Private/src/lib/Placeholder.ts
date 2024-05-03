import {PostEntryData, TopicEntryData} from "./Types.ts";

export namespace Placeholder {

    function randomDate(start: Date, end: Date): string {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
    }

    export const postEntries: PostEntryData[] = [
        // Computação Gráfica
        {
            title: "Introdução aos Gráficos 3D",
            author: "Ana Silva",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Computação gráfica",
            section: "Design e Visualização",
            views: 324,
            comments: 12
        },
        {
            title: "Explorando a Realidade Virtual",
            author: "Bruno Santos",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Computação gráfica",
            section: "Design e Visualização",
            views: 567,
            comments: 23
        },
        {
            title: "Renderização Fotorrealística",
            author: "Carla Oliveira",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Computação gráfica",
            section: "Design e Visualização",
            views: 789,
            comments: 45
        },
        // Cálculo III
        {
            title: "Teorema Fundamental do Cálculo",
            author: "Ana Silva",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Cálculo III",
            section: "Análise Avançada",
            views: 432,
            comments: 34
        },
        {
            title: "Integração em Espaços de Altas Dimensões",
            author: "Bruno Santos",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Cálculo III",
            section: "Análise Avançada",
            views: 654,
            comments: 56
        },
        {
            title: "Aplicações de Séries de Taylor",
            author: "Carla Oliveira",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Cálculo III",
            section: "Análise Avançada",
            views: 876,
            comments: 67
        },
        // Álgebra Linear
        {
            title: "Espaços Vetoriais e Transformações Lineares",
            author: "Ana Silva",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Álgebra Linear",
            section: "Álgebra Aplicada",
            views: 567,
            comments: 45
        },
        {
            title: "Diagonalização de Matrizes",
            author: "Bruno Santos",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Álgebra Linear",
            section: "Álgebra Aplicada",
            views: 789,
            comments: 67
        },
        {
            title: "Geometria Analítica",
            author: "Carla Oliveira",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Álgebra Linear",
            section: "Álgebra Aplicada",
            views: 901,
            comments: 78
        },
        // Arquitetura de computadores
        {
            title: "História e Evolução dos Processadores",
            author: "Ana Silva",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Arquitetura de computadores",
            section: "Arquitetura de Hardware",
            views: 432,
            comments: 23
        },
        {
            title: "Arquitetura RISC vs CISC",
            author: "Bruno Santos",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Arquitetura de computadores",
            section: "Arquitetura de Hardware",
            views: 765,
            comments: 56
        },
        {
            title: "Desempenho e Otimização de Cache",
            author: "Carla Oliveira",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Arquitetura de computadores",
            section: "Arquitetura de Hardware",
            views: 987,
            comments: 89
        },
        // Estrutura de dados
        {
            title: "Estruturas de Dados Avançadas: Árvores B",
            author: "Ana Silva",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Estrutura de dados",
            section: "Estruturas de Dados e Algoritmos",
            views: 654,
            comments: 34
        },
        {
            title: "Algoritmos de Ordenação Eficientes",
            author: "Bruno Santos",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Estrutura de dados",
            section: "Estruturas de Dados e Algoritmos",
            views: 876,
            comments: 45
        },
        {
            title: "Grafos e Algoritmos de Caminho Mínimo",
            author: "Carla Oliveira",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Estrutura de dados",
            section: "Estruturas de Dados e Algoritmos",
            views: 1098,
            comments: 56
        },
        // Sistemas operacionais
        {
            title: "Gerenciamento de Processos e Threads",
            author: "Ana Silva",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Sistemas operacionais",
            section: "Gerenciamento de Sistemas",
            views: 432,
            comments: 23
        },
        {
            title: "Virtualização de Sistemas Operacionais",
            author: "Bruno Santos",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Sistemas operacionais",
            section: "Gerenciamento de Sistemas",
            views: 765,
            comments: 45
        },
        {
            title: "Segurança e Proteção de Dados",
            author: "Carla Oliveira",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            topic: "Sistemas operacionais",
            section: "Gerenciamento de Sistemas",
            views: 1098,
            comments: 67
        }
    ];
    export const recentWork = [
        {
            title: "Como objetos 3D são renderizados em 2D",
        },
        {
            title: "Como criar um blog com React e TypeScript",
        },
        {
            title: "Sockets em C++: um guia completo",
        },
    ]

    export const topicEntries: TopicEntryData[] = [
        {
            name: "Computação gráfica",
            views: 12345,
            comments: 678,
            contentCount: 45
        },
        {
            name: "Cálculo III",
            views: 23456,
            comments: 789,
            contentCount: 56
        },
        {
            name: "Álgebra Linear",
            views: 34567,
            comments: 890,
            contentCount: 67
        },
        {
            name: "Arquitetura de computadores",
            views: 45678,
            comments: 901,
            contentCount: 78
        },
        {
            name: "Estrutura de dados",
            views: 56789,
            comments: 123,
            contentCount: 89
        },
        {
            name: "Sistemas operacionais",
            views: 67890,
            comments: 234,
            contentCount: 90
        }
    ]

    export const recentComments = [
        {
            content: "Estou com dificuldades para entender o conceito de polimorfismo",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            post: {
                topic: "Matemática Discreta",
                section: "Funções",
            },
            author: {
                name: "João da Silva",
                avatar: "https://randomuser"
            }
        },

        {
            content: "Como vc descobriu A e Z na matriz de projeção?",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            post: {
                topic: "Computação Gráfica",
                section: "Vertex Shaders",
            },
            author: {
                name: "Maria Oliveira",
                avatar: "https://randomuser"
            }
        },

        {
            content: "It might be more of an obsession You really make a strong impression (you sure do) Nobody saw me in the lobby (saw me in the lobby) Nobody saw me in your arms, mm I'm not sentimental But there's somethin' 'bout the way you look tonight ('bout the way you look tonight) Makes me wanna make 'em jealous I'm the only one who does it how you like (only one who does it how you—) You better lock your phone (oh) And look at me when you're alone (you're alone, you're alone) Won't take a lot to get you goin' (get me goin', get me goin') I'm sorry if it's torture though (torture though) I know, I know",
            date: randomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
            post: {
                topic: "Matemática Discreta",
                section: "Funções",
            },
            author: {
                name: "João da Silva",
                avatar: "https://randomuser"
            }
        },
    ]
}

