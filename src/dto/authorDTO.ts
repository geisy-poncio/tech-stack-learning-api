export class AuthorDtoOutput {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly isDeleted: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly deletedAt: Date | null
    ){}
}

export class CreateAuthorDtoInput {
    constructor(
        public readonly name: string
    ){}
}

export class GetAuthorByNameDtoInput {
    constructor(
        public readonly name: string
    ){}
}

export class GetAuthorByIdDtoInput {
    constructor(
        public readonly id: string,
        public readonly page?: number,
        public readonly size?: number
    ){}
}

export class GetAllAuthorsDtoInput {
    constructor(
        public readonly page: number,
        public readonly size: number
    ){}
}

export class UpdateAuthorByIdDtoInput {
    constructor(
        public readonly id: string,
        public readonly name: string
    ){}
}

export class DeleteAuthorByIdDtoInput {
    constructor(
        public readonly id: string
    ){}
}