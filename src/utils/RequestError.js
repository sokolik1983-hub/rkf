function RequestError(message, response) {
    this.name = "RequestError";
    this.message = message;
    this.response = response;
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    } else {
        this.stack = (new Error()).stack;
    }
}

RequestError.prototype = Object.create(Error.prototype);
RequestError.prototype.constructor = RequestError;

export const handleRequestError = (error) => {
    if (error instanceof RequestError) {
        return error.response.text()
    } else {
        throw error
    }
}

export default RequestError;