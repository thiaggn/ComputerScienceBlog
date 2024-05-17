import {ContentState} from "./ContentState.ts";

export enum BlockType {
    Text,
    Table,
    Image,
    Code,
    Math
}

export abstract class BlockState {
    id: string;
    abstract type: BlockType;
    abstract contents: ReadonlyArray<ContentState>;
    next: BlockNeighbor;
    prev: BlockNeighbor;
    protected constructor(id: string) {
        this.id =  id;
    }

    public abstract createCopy(mutator?: (tag: BlockState) => void): BlockState;
}

export type BlockNeighbor = BlockState | undefined;