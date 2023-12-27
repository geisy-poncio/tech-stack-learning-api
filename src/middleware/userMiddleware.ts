import Joi from "joi";
import { apiStatusCode } from "../util/apiStatusCode";

export function createUserValidator(request: any, response: any, next: any) {
    console.log("index::createUserValidator::verifying if the input is valid");

    const schema = Joi.object({
        email: Joi.string().trim().required(),
        password: Joi.string().trim().required()
    });

    const result = schema.validate(request.body);
    if (result.error) {
        console.warn("index::createUserValidator::the input is invalid");
        return response.status(400).json({
            message: result.error.message,
            apiStatusCode: apiStatusCode.INVALID_INPUT
        });
    }

    console.log("index::createUserValidator::the input is valid");
    request.body = result.value;
    next();
}

export function authenticateUserValidator(request: any, response: any, next: any) {
    console.log("index::authenticateUserValidator::verifying if the input is valid");

    const schema = Joi.object({
        email: Joi.string().trim().required(),
        password: Joi.string().trim().required()
    });

    const result = schema.validate(request.body);
    if (result.error) {
        console.warn("index::authenticateUserValidator::the input is invalid");
        return response.status(400).json({
            message: result.error.message,
            apiStatusCode: apiStatusCode.INVALID_INPUT
        });
    }

    console.log("index::authenticateUserValidator::the input is valid");
    request.body = result.value;
    next();
}