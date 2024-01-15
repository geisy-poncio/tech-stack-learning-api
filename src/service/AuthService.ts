import { AuthenticateUserDtoInput, CreateUserDtoInput } from "../dto/userDTO";
import { AdminConfirmSignUpCommand, AdminInitiateAuthCommand, CognitoIdentityProviderClient, SignUpCommand } from "@aws-sdk/client-cognito-identity-provider"
import { getSecretHash } from "../util/getSecretHash";
import { Output } from "../util/Output";
import { apiStatusCode } from "../util/apiStatusCode";

export class AuthService{
    constructor(
        private readonly cognitoIdentityProviderClient = new CognitoIdentityProviderClient()
    ){}

    async createUser(createUserDtoInput: CreateUserDtoInput) {
        const signUpCommand = new SignUpCommand({
            ClientId: String(process.env.COGNITO_CLIENT_ID),
            Username: createUserDtoInput.email,
            Password: createUserDtoInput.password,
            SecretHash: await getSecretHash(createUserDtoInput.email)
        });
           
        const confirmSignUpCommand = new AdminConfirmSignUpCommand({
            UserPoolId: String(process.env.COGNITO_USER_POOL_ID),
            Username: createUserDtoInput.email
        });

        try {
            console.log("AuthService::createUser::starting registration process");
            const signUp = await this.cognitoIdentityProviderClient.send(signUpCommand);
            console.log("AuthService::createUser::user registered successfully");

            console.log("AuthService::createUser::starting confirmation process");
            const confirmSignUpResult = await this.cognitoIdentityProviderClient.send(confirmSignUpCommand);
            console.log("AuthService::createUser::user confirmed successfully");
            
            return new Output(apiStatusCode.SUCCESS);

        } catch (error) {
            console.error("AuthService::createUser::error creating user:", error);
            throw error;
        }
    }

    async authenticateUser(authenticateUserDtoInput: AuthenticateUserDtoInput) {
        const authCommand = new AdminInitiateAuthCommand({
            AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
            ClientId: String(process.env.COGNITO_CLIENT_ID),
            UserPoolId: String(process.env.COGNITO_USER_POOL_ID),
            AuthParameters: {
                USERNAME: authenticateUserDtoInput.email,
                PASSWORD: authenticateUserDtoInput.password,
                SECRET_HASH: await getSecretHash(authenticateUserDtoInput.email)
            }
        });
        
        try {
            console.log("AuthService:authenticateUser::starting authentication process");
            const result = await this.cognitoIdentityProviderClient.send(authCommand);
            console.log("AuthService:authenticateUser::user authenticated");

            return new Output(apiStatusCode.SUCCESS, result.AuthenticationResult?.IdToken);

        } catch (error) {
            console.error("AuthService::authenticateUser::error authenticating user:", error);
            throw error;
        }
    }
}