export class ObjectWithSameReferenceError extends Error {
    constructor(object: object) {
        super("Newer version of object references the old one. React can't know it was updated." + JSON.stringify(object));
    }
}