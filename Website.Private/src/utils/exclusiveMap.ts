import {ReactNode} from "react";

export function exclusiveMap<T, O>(arr: Array<T>, evaluator: (item: T, i: number) => O | undefined) {
    const out: Array<O> = [];

    let i = 0;
    for(let element of arr) {
        let result = evaluator(element, i);
        if(result) out.push(result);
        i++;
    }

    return out;
}