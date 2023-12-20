import Joi from "joi";
import { apiStatusCode } from "../util/apiStatusCode";
import { json } from "stream/consumers";

export function createBookValidator(request: any, response: any, next: any) {
    console.log("index::createBookValidator::verifying if the input is valid");

    const schema = Joi.object({
        name: Joi.string().trim().required(),
        authorId: Joi.string().trim().uuid().required()
    });

    const result = schema.validate(request.body);
    if (result.error) {
        console.warn("index::createBookValidator::the input invalid");
        return response.status(400).json({
            message: result.error.message,
            apiStatusCode: apiStatusCode.INVALID_INPUT
        });
    }

    console.log("index::createBookValidator::the input is valid");
    request.body = result.value;
    next();
}

export function getAllBooksValidator(request: any, response: any, next: any) {
    console.log("index::getAllBooksValidator::verifying if the input is valid");

    const schema = Joi.object({
        page: Joi.number().integer().min(0).required(),
        size: Joi.number().integer().positive().required()
    });

    const result = schema.validate(request.query);
    if (result.error) {
        console.warn("index::getAllBooksValidator::the input is invalid");
        return response.status(400).json({
            message: result.error.message,
            apiStatusCode: apiStatusCode.INVALID_INPUT
        });
    }

    console.log("index::getAllBooksValidator::the input is valid");
    request.query = result.value;
    next();
}

export function getBookByIdValidator(request: any, response: any, next: any) {
    console.log("index::getBookByIdValidator::verifying if the input is valid");

    const schema = Joi.object({
        id: Joi.string().trim().uuid().required()
    });

    const result = schema.validate(request.params);
    if (result.error) {
        console.warn("index::getBookByIdValidator::the input invalid");
        return response.status(400).json({
            message: result.error.message,
            apiStatusCode: apiStatusCode.INVALID_INPUT
        });
    }

    console.log("index::getBookByIdValidator::the input is valid");
    request.params = result.value;
    next();
}

export function updateBookByIdValidator(request: any, response: any, next: any) {
    console.log("index::updateBookByIdValidator::verifying if the input is valid");

    const paramsSchema = Joi.object({
        id: Joi.string().trim().uuid().required()
    });

    const paramsResult = paramsSchema.validate(request.params);
    if (paramsResult.error) {
        console.warn("index::updateBookByIdValidator::input invalid");
        return response.status(400).json({
            message: paramsResult.error.message,
            apiStatusCode: apiStatusCode.INVALID_INPUT
        });
    }

    const bodySchema = Joi.object({
        name: Joi.string().trim(),
        authorId: Joi.string().trim().uuid()
    }).or('name', 'authorId');

    const bodyResult = bodySchema.validate(request.body);
    if (bodyResult.error) {
        console.warn("index::updateBookByIdValidator::input invalid");
        return response.status(400).json({
            message: bodyResult.error.message,
            apiStatusCode: apiStatusCode.INVALID_INPUT
        });
    }

    console.log("index::updateBookByIdValidator::the input is valid");
    request.params = paramsResult.value;
    request.body = bodyResult.value;
    next();
}

export function deleteBookByIdValidator(request: any, response: any, next: any) {
    console.log("index::deleteBookByIdValidator::verifying if the input is valid");

    const schema = Joi.object({
        id: Joi.string().trim().uuid().required()
    });

    const result = schema.validate(request.params);
    if (result.error) {
        console.warn("index::deleteBookByIdValidator::the input invalid");
        return response.status(400).json({
            message: result.error.message,
            apiStatusCode: apiStatusCode.INVALID_INPUT
        });
    }

    console.log("index::deleteBookByIdValidator::the input is valid");
    request.params = result.value;
    next();
}