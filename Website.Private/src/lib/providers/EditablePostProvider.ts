import {PostItem} from "../../pages/editor/types/item/PostItem.ts";
import {EditablePostDataPlaceholder} from "../placeholders/EditablePostDataPlaceholder.ts";

export class EditablePostProvider {
    public static async get(postId: string): Promise<PostItem> {
        await new Promise(resolve => setTimeout(resolve, 1));
        return PostItem.create(EditablePostDataPlaceholder);
    }
}