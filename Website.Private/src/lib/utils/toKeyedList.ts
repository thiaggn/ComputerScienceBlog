export function toKeyedList(arr: object[]) {
    return arr.map((item: any) => {
        Object.assign(item, {key: Math.random()})
    })
}