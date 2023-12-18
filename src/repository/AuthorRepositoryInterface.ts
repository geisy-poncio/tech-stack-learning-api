import { AuthorDtoOutput } from "../dto/authorDTO";

export interface AuthorRepositoryInterface{
    saveAuthor(input: {name: string}): Promise<AuthorDtoOutput>;
    getAuthorByName(nameAuthor: string): Promise<AuthorDtoOutput| null>;
    getAllAuthors(): Promise<AuthorDtoOutput[] | null>;
    getAuthorById(authorId: string): Promise<AuthorDtoOutput | null>;
    updateAuthorById(authorId: string, nameAuthor: string): Promise<AuthorDtoOutput>;
    deleteAuthorById(authorId: string): Promise<AuthorDtoOutput>;
}