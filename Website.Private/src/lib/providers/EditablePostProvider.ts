import {EditablePostItem} from "../../pages/editor/types/PostTypes.ts";
import {EditablePostDataPlaceholder} from "../placeholders/EditablePostDataPlaceholder.ts";

export class EditablePostProvider {
    public static async get(postId: string): Promise<EditablePostItem> {
        await new Promise(resolve => setTimeout(resolve, 1));
        return EditablePostItem.create(EditablePostDataPlaceholder);
    }
}