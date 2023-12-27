import express from "express";
import { authenticateUserValidator, createUserValidator } from "../middleware/userMiddleware";
import { AuthController } from "../controller/AuthController";
import { AuthenticateUserDtoInput, CreateUserDtoInput } from "../dto/userDTO";
import { AuthService } from "../service/AuthService";

const authService = new AuthService();
const authController = new AuthController(authService);

const router = express.Router();

export function authRoute() {
    router.post("/signUp", createUserValidator, async (request, response, next) => {
        try{
            const createUserDtoInput = new CreateUserDtoInput(request.body.email, request.body.password);
            const output = await authController.createUser(createUserDtoInput);

            response.status(201).json({ 
                message: "User created successfully",
                apiStatusCode: output.apiStatusCode,
                data: output.data
            });

        } catch (err) {
            next(err);
        }
    })

    router.post("/login", authenticateUserValidator, async (request, response, next) => {
        try {
            const authenticateUserDtoInput = new AuthenticateUserDtoInput(request.body.email, request.body.password);
            const output = await authController.authenticateUser(authenticateUserDtoInput);

            response.status(200).json({
                message: "User authenticated successfully",
                apiStatusCode: output.apiStatusCode,
                data: output.data
            });

        } catch (error) {
            next(error)
        }
    })

    return router;
}