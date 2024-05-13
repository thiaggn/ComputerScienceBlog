import {ReactNode} from "react";

export function exclusiveMap<T>(arr: Array<T>, evaluator: (item: T) => ReactNode | null) {
    const out: Array<ReactNode> = [];

    for(let element of arr) {
        let result = evaluator(element);
        if(result) out.push(result);
    }

    return out;
}