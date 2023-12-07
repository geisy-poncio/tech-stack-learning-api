import { ErrorRequestHandler } from "express";
import { apiStatusCode } from "../util/apiStatusCode";

export const errorHandler: ErrorRequestHandler = ((error, request, response, next) => {
    console.error(error.message)
    return response.status(500).json({
        message: "Internal error",
        apiStatusCode: apiStatusCode.INTERNAL_ERROR
    })
})