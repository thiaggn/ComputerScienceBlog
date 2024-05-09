import {SelectionObserver} from "./SelectionObserver.ts";

export class CaretMoveAction {
    public readonly move: Function;

    public constructor(move: Function) {
        this.move = move;
    }
}