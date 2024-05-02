export type RecentCommentData = {
    content: string,
    date: string,
    author: {
        name: string,
        avatar: string
    },

    post: {
        topic: string,
        section: string
    }
}