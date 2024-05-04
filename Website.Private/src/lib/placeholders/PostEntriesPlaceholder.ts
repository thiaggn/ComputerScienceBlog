import {PostEntryData, TopicEntryData} from "../Types.ts";

import {getRandomDate} from "../utils/getRandomDate.ts";

export const PostEntriesPlaceholder: PostEntryData[] = [
    // Computação Gráfica
    {
        title: "Introdução aos Gráficos 3D",
        author: "Ana Silva",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Computação gráfica",
        section: "Design e Visualização",
        views: 324,
        comments: 12
    },
    {
        title: "Explorando a Realidade Virtual",
        author: "Bruno Santos",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Computação gráfica",
        section: "Design e Visualização",
        views: 567,
        comments: 23
    },
    {
        title: "Renderização Fotorrealística",
        author: "Carla Oliveira",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Computação gráfica",
        section: "Design e Visualização",
        views: 789,
        comments: 45
    },
    // Cálculo III
    {
        title: "Teorema Fundamental do Cálculo",
        author: "Ana Silva",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Cálculo III",
        section: "Análise Avançada",
        views: 432,
        comments: 34
    },
    {
        title: "Integração em Espaços de Altas Dimensões",
        author: "Bruno Santos",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Cálculo III",
        section: "Análise Avançada",
        views: 654,
        comments: 56
    },
    {
        title: "Aplicações de Séries de Taylor",
        author: "Carla Oliveira",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Cálculo III",
        section: "Análise Avançada",
        views: 876,
        comments: 67
    },
    // Álgebra Linear
    {
        title: "Espaços Vetoriais e Transformações Lineares",
        author: "Ana Silva",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Álgebra Linear",
        section: "Álgebra Aplicada",
        views: 567,
        comments: 45
    },
    {
        title: "Diagonalização de Matrizes",
        author: "Bruno Santos",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Álgebra Linear",
        section: "Álgebra Aplicada",
        views: 789,
        comments: 67
    },
    {
        title: "Geometria Analítica",
        author: "Carla Oliveira",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Álgebra Linear",
        section: "Álgebra Aplicada",
        views: 901,
        comments: 78
    },
    // Arquitetura de computadores
    {
        title: "História e Evolução dos Processadores",
        author: "Ana Silva",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Arquitetura de computadores",
        section: "Arquitetura de Hardware",
        views: 432,
        comments: 23
    },
    {
        title: "Arquitetura RISC vs CISC",
        author: "Bruno Santos",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Arquitetura de computadores",
        section: "Arquitetura de Hardware",
        views: 765,
        comments: 56
    },
    {
        title: "Desempenho e Otimização de Cache",
        author: "Carla Oliveira",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Arquitetura de computadores",
        section: "Arquitetura de Hardware",
        views: 987,
        comments: 89
    },
    // Estrutura de dados
    {
        title: "Estruturas de Dados Avançadas: Árvores B",
        author: "Ana Silva",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Estrutura de dados",
        section: "Estruturas de Dados e Algoritmos",
        views: 654,
        comments: 34
    },
    {
        title: "Algoritmos de Ordenação Eficientes",
        author: "Bruno Santos",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Estrutura de dados",
        section: "Estruturas de Dados e Algoritmos",
        views: 876,
        comments: 45
    },
    {
        title: "Grafos e Algoritmos de Caminho Mínimo",
        author: "Carla Oliveira",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Estrutura de dados",
        section: "Estruturas de Dados e Algoritmos",
        views: 1098,
        comments: 56
    },
    // Sistemas operacionais
    {
        title: "Gerenciamento de Processos e Threads",
        author: "Ana Silva",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Sistemas operacionais",
        section: "Gerenciamento de Sistemas",
        views: 432,
        comments: 23
    },
    {
        title: "Virtualização de Sistemas Operacionais",
        author: "Bruno Santos",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Sistemas operacionais",
        section: "Gerenciamento de Sistemas",
        views: 765,
        comments: 45
    },
    {
        title: "Segurança e Proteção de Dados",
        author: "Carla Oliveira",
        date: getRandomDate(new Date(2023, 11, 12), new Date(2024, 4, 2)),
        topic: "Sistemas operacionais",
        section: "Gerenciamento de Sistemas",
        views: 1098,
        comments: 67
    }
];

export const topicEntries: TopicEntryData[] = [
    {
        name: "Computação gráfica",
        contentCount: 45
    },
    {
        name: "Cálculo III",
        contentCount: 56
    },
    {
        name: "Álgebra Linear",
        contentCount: 67
    },
    {
        name: "Arquitetura de computadores",
        contentCount: 78
    },
    {
        name: "Estrutura de dados",
        contentCount: 89
    },
    {
        name: "Sistemas operacionais",
        contentCount: 90
    }
]
