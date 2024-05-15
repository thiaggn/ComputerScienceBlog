export interface TagMutation {
    target: Element;
    value: string;
    isSingleCharacterDeletion?: boolean
    consumedLastUpfrontCharacter?: boolean
}