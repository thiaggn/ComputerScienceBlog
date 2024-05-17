import {useEffect} from "react";
import {InputDetails, InputHandler} from "../services/InputHandler.ts";
import {SelectionEvent} from "../misc/SelectionEvent.ts";
import {SelectionMode} from "../misc/SelectionMode.ts";
import {BlockState} from "../types/state/BlockState.ts";

export function useInputEvents(blocks: BlockState[]) {
    const inputHandler = new InputHandler();

    useEffect(() => {
        console.log("Re-rendered", blocks);
       InputHandler.consumeNextSelection()
    }, [blocks]);

    useEffect(() => {
        const handleKeydown = async (keyboard: KeyboardEvent) => {
            const selection = await SelectionEvent.tryGet()
            if(selection == null) return;
            const inputDetails: InputDetails<KeyboardEvent> = {selection, event: keyboard};

            switch (keyboard.code) {
                case "Backspace":
                    if(selection.mode == SelectionMode.Caret) inputHandler.handleCaretBackspace(inputDetails);
                    else inputHandler.handleRangeBackspaceOrDelete(inputDetails);
                    break;

                case "Delete":
                    if(selection.mode == SelectionMode.Caret) inputHandler.handleCaretDelete(inputDetails);
                    else inputHandler.handleRangeBackspaceOrDelete(inputDetails);
                    break;

                case "Enter":
                    inputHandler.handleEnter(inputDetails);
                    break;

                case "z":
                    if(keyboard.ctrlKey) keyboard.preventDefault()
                    break;

                case "y":
                    if(keyboard.ctrlKey) keyboard.preventDefault();
                    break;
            }

        }

        const handleInput = async (event: Event) => {
            const selection = await SelectionEvent.tryGet()
            if(selection == null) return;
            const inputDetails: InputDetails<Event> = {selection, event};

            if(selection.mode == SelectionMode.Caret) {
                inputHandler.handleSingleCharacterInput(inputDetails);
            }

            else inputHandler.handleRangeBackspaceOrDelete(inputDetails);
        }

        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("input", handleInput);

        return () => {
            document.removeEventListener("keydown", handleKeydown);
            document.removeEventListener("input", handleInput);
        }
    }, []);
}

