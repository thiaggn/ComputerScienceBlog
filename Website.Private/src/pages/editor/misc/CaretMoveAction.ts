export class CaretMoveAction {
    anchorNode: Node;
    focusNode: Node;
    anchorOffset: number;
    focusOffset: number;

    private constructor(anchorNode: Node, focusNode: Node, anchorOffset: number, focusOffset: number) {
        this.anchorNode = anchorNode;
        this.focusNode = focusNode;
        this.anchorOffset = anchorOffset;
        this.focusOffset = focusOffset;
    }

    public static singleMovement() {

    }
}