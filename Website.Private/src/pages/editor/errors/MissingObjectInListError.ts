export class MissingObjectInListError extends Error {
    constructor(object: object) {
        super();
        this.message = "Failed to find object in list. " + JSON.stringify(object);
    }

}