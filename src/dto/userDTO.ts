export class CreateUserDtoInput {
    constructor(
        public readonly email: string,
        public readonly password: string
    ){}
}

export class AuthenticateUserDtoInput {
    constructor(
        public readonly email: string,
        public readonly password: string
    ){}
}