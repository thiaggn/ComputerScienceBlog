export enum PostVisibilityOption {
    Published,
    Draft,
    Trash,
}

export const postVisibilityOptions = [
    {label: "Público", key: PostVisibilityOption.Published},
    {label: "Rascunho", key: PostVisibilityOption.Draft},
    {label: "Lixeira", key: PostVisibilityOption.Trash},
]