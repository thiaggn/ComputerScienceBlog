import {BlockData} from "./BlockData.ts";

export interface PostData {
    id: string;
    title: string;
    blocks: BlockData[];
}