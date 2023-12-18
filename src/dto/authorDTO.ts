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