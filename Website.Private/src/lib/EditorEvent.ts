export type BlogEventDataMap = {
    "tagInput": {
        value: string
    },
}
export class EditorEvent {
    static create<T extends keyof BlogEventDataMap>(type: T, data: BlogEventDataMap[T]) {
        return new CustomEvent(type, {
            detail: data
        });
    }
}
