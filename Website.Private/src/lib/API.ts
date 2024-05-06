import {EditablePostDataPlaceholder} from "./placeholders/EditablePostDataPlaceholder.ts";
import {BlockData, PostData, PostItem, TagData, TagItem} from "../pages/editor/types/EditorTypes.ts";

export class API {

    private static editablePost = EditablePostDataPlaceholder;

    private static map = new Map<string, PostData>([
        ["1", EditablePostDataPlaceholder],
        ["2", JSON.parse(JSON.stringify(EditablePostDataPlaceholder)) as PostData]
    ]);

    public static wait = () => new Promise(resolve => setTimeout(resolve, 1000));
    public static async getEditablePost(postId: string): Promise<PostItem> {
        await this.wait();

        const postData = this.map.get(postId);

        if(postData) {
            return new PostItem(this.editablePost);
        }

        throw new Error("O post com o id fornecido não existe.");
    }

    public static async addBlockToEditablePost(data: BlockData) {
        await this.wait();
        this.editablePost.blocks.push(data);
    }
}