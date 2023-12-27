import { AuthenticateUserDtoInput, CreateUserDtoInput } from "../dto/userDTO";
import { AuthService } from "../service/AuthService";

export class AuthController{
    constructor(
        private readonly authService = new AuthService()
    ){}

    async createUser(createUserDtoInput: CreateUserDtoInput) {
        console.log("AuthController::createUser::request received");
        return await this.authService.createUser(createUserDtoInput);
    }

    async authenticateUser(authenticateUserDtoInput: AuthenticateUserDtoInput) {
        console.log("AuthController::authenticateUser::request received");
        return await this.authService.authenticateUser(authenticateUserDtoInput);
    }
}