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

export type PostEntryData = {
    title: string,
    author: string,
    date: string,
    topic: string,
    section: string,
    views: number,
    comments: number,
}

export type TopicEntryData = {
    name: string,
    views: number,
    comments: number,
    contentCount: number;
}