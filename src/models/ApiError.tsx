export class ApiError extends Error {
    title: string
    constructor(title: string, message: string) {
        super(message);
        this.name = "ApiError";
        this.title = title;
    }
}
