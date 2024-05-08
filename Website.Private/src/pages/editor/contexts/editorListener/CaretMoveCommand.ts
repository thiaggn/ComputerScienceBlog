import {EditorSelection} from "../../types/EditorSelection.ts";
import {SelectionListener} from "./SelectionListener.ts";

export class CaretMoveCommand {

    private readonly action: Function;
    private constructor(action: Function) {
        this.action = action;
    }
    public execute() {
        this.action();
    }

    public static forCollapsed(units: number) {
        return new CaretMoveCommand(() => {
            const {focusNode, focusOffset} = SelectionListener.getLastSelection();
            document.getSelection()?.setPosition(focusNode, focusOffset + units);
        });
    }

    public static forRangeWithinSameElement(offset: number) {
        return new CaretMoveCommand(() => {
            const {focusNode, focusOffset} = SelectionListener.getLastSelection();
            document.getSelection()?.setPosition(focusNode, offset);
        })
    }
}