export class BookDtoOutput {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly isDeleted: boolean,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly deletedAt: Date | null,
        public readonly authorId: string
    ){}
}

export class CreateBookDtoInput {
    constructor(
        public readonly name: string,
        public readonly authorId: string
    ){}
}

export class GetAllBooksDtoInput {
    constructor(
        public readonly page: number,
        public readonly size: number
    ){}
}

export class GetBookByIdDtoInput {
    constructor(
        public readonly id: string
    ){}
}

export class UpdateBookByIdDtoInput {
    constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly authorId?: string
    ){}
}

export class DeleteBookByIdDtoInput {
    constructor(
        public readonly id: string
    ){}
}