/* eslint-disable max-classes-per-file */
/**
 *
 */

class APIError extends Error {
    /**
     * Create a new HTTP error
     * @param {number} status - The HTTP status code of the error
     * @param {string} message - The error message
     */
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    }
}

/**
 *
 */
class BadRequestError extends APIError {
    /**
     * Create a new `Bad Request` error
     * @param {string} [message='Bad Request'] - The error message
     */
    constructor(message = 'Bad Request') {
        super(400, message);
    }
}

/**
 *
 */
class UnauthorizedError extends APIError {
    /**
     * Create a new `Unauthorized` error
     * @param {string} [message='Unauthorized'] - The error message
     */
    constructor(message = 'Unauthorized') {
        super(401, message);
    }
}

/**
 *
 */
class AccessDeniedError extends APIError {
    /**
     * Create a new `Access Denied` error
     * @param {string} [message='Access Denied'] - The error message
     */
    constructor(message = 'Access Denied') {
        super(403, message);
    }
}

/**
 *
 */
class ForbiddenError extends APIError {
    /**
     * Create a new `Forbidden` error
     * @param {string} [message='Forbidden'] - The error message
     */
    constructor(message = 'Forbidden') {
        super(403, message);
    }
}

/**
 *
 */
class NotFoundError extends APIError {
    /**
     * Create a new `Not Found` error
     * @param {string} [message='Not Found'] - The error message
     */
    constructor(message = 'Not Found') {
        super(404, message);
    }
}

/**
 *
 */
class InternalServerError extends APIError {
    /**
     * Create a new `Internal Server` error
     * @param {string} [message='Internal Server Error'] - The error message
     */
    constructor(message = 'Internal Server Error') {
        super(500, message);
    }
}

module.exports = {
    APIError,
    BadRequestError,
    UnauthorizedError,
    AccessDeniedError,
    ForbiddenError,
    NotFoundError,
    InternalServerError,
};
