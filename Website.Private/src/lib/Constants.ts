export enum NavOption {
    Home= "/blog",
    Posts = "/blog/posts",
    Comments = "/blog/comments",
    People = "/blog/people",
    Settings = "/blog/settings"
}

export const navButtons = [
    {label: "Início", icon: "home", key: NavOption.Home},
    {label: "Postagens", icon: "news", key: NavOption.Posts},
    {label: "Comentários", icon: "chat", key: NavOption.Comments},
    {label: "Pessoas", icon: "person", key: NavOption.People},
    {label: "Ajustes", icon: "settings", key: NavOption.Settings}
]