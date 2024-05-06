export enum PostVisibilityFilter {
    Published,
    Draft,
    Trash,
}

export const postVisibilityFilters = [
    {label: "Público", key: PostVisibilityFilter.Published},
    {label: "Rascunho", key: PostVisibilityFilter.Draft},
    {label: "Lixeira", key: PostVisibilityFilter.Trash},
]