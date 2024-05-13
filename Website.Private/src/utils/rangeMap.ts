export function rangeMap<I, O>(evaluator: (value: I) => O | null, in_arr: I[], start: number, end: number,  ): O[] {
    const out: O[] = [];

    for(let i = start; i < end; i++) {
        const item = evaluator(in_arr[i]);
        if(item) out.push(item);
    }

    return out;
}