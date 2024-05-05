import {v4 as uuidv4} from "uuid";
export type IdentifiedItem<T> = T & {id: string};

export function toIdentifiedItem<T>(item: T): IdentifiedItem<T> {
    return {
        ...item,
        id: uuidv4()
    }
}