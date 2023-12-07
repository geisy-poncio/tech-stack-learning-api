import Joi from "joi";
import { apiStatusCode } from "../util/apiStatusCode";

export function createAuthorValidator(request: any, response: any, next: any) {
    console.log("index::createAuthorValidator::verifying if the input is valid");

    const schema = Joi.object({
        authorName: Joi.string().trim().required()
    });

    const result = schema.validate(request.body);
    if (result.error) {
        console.warn("index::createAuthorValidator::the input invalid")
        return response.status(400).json({
            message: result.error.message,
            apiStatusCode: apiStatusCode.INVALID_INPUT
        })
    }

    console.log("index::createAuthorValidator::the input is valid");
    request.body = result.value;
    next();
}

export function getAuthorByIdValidator(request: any, response: any, next: any) {
    console.log("index::getAuthorByIdValidator::verifying if the input is valid");

    const schema = Joi.object({
        id: Joi.string().trim().uuid().required()
    });

    const result = schema.validate(request.params);
    if (result.error) {
        console.warn("index::getAuthorByIdValidator::the input invalid")
        return response.status(400).json({
            message: result.error.message,
            apiStatusCode: apiStatusCode.INVALID_INPUT
        })
    }
    
    console.log("index::getAuthorByIdValidator::the input is valid");
    request.params = result.value;
    next();
}

export function updateAuthorByIdValidator(request: any, response: any, next: any) {
    console.log("index::updateAuthorByIdValidator::verifying if the input is valid");

    const paramsSchema = Joi.object({
        id: Joi.string().trim().uuid().required()
    });

    const paramsResult = paramsSchema.validate(request.params);
    if (paramsResult.error) {
        console.warn("index::updateAuthorByIdValidator::input invalid")
        return response.status(400).json({
            message: paramsResult.error.message,
            apiStatusCode:apiStatusCode.INVALID_INPUT
        })
    }

    const bodySchema = Joi.object({
        authorName: Joi.string().trim().required()
    });

    const bodyResult = bodySchema.validate(request.body);
    if (bodyResult.error) {
        console.warn("index::updateAuthorByIdValidator::input invalid")
        return response.status(400).json({
            message: bodyResult.error.message,
            apiStatusCode:apiStatusCode.INVALID_INPUT
        })
    }

    console.log("index::updateAuthorByIdValidator::the input is valid");
    request.params = paramsResult.value;
    request.body = bodyResult.value;
    next();
}

export function deleteAuthorByIdValidator(request: any, response: any, next: any) {
    console.log("index::deleteAuthorByIdValidator::verifying if the input is valid");

    const schema = Joi.object({
        id:Joi.string().trim().uuid().required()
    });

    const result = schema.validate(request.params);
    if (result.error) {
        console.warn("index::deleteAuthorByIdValidator::input invalid")
        return response.status(400).json({
            message: result.error.message,
            apiStatusCode:apiStatusCode.INVALID_INPUT
        })
    }

    console.log("index::deleteAuthorByIdValidator::the input is valid");
    request.params = result.value;
    next();
}