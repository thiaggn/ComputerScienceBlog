export abstract class ContentState {
    id: string;
    abstract content: unknown;
    next: ContentNeighbor;
    prev: ContentNeighbor;
    protected constructor(id: string) {
        this.id = id;
    }

    public abstract createCopy(mutator?: (tag: ContentState) => void): ContentState;
}


export type ContentNeighbor = ContentState | undefined;
