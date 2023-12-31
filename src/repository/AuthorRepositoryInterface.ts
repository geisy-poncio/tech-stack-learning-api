import { 
    AuthorDtoOutput,
    CreateAuthorDtoInput,
    GetAuthorByNameDtoInput,
    GetAuthorByIdDtoInput,
    UpdateAuthorByIdDtoInput,
    DeleteAuthorByIdDtoInput, 
    GetAllAuthorsDtoInput
} from "../dto/authorDTO";

export interface AuthorRepositoryInterface{
    saveAuthor(createAuthorDtoInput: CreateAuthorDtoInput): Promise<AuthorDtoOutput>;
    getAuthorByName(getAuthorByNameDtoInput: GetAuthorByNameDtoInput): Promise<AuthorDtoOutput| null>;
    getAllAuthors(getAllAuthorsDtoInput: GetAllAuthorsDtoInput): Promise<AuthorDtoOutput[] | null>;
    getAuthorById(getAuthorByIdDtoInput: GetAuthorByIdDtoInput): Promise<AuthorDtoOutput | null>;
    updateAuthorById(updateAuthorByIdDtoInput: UpdateAuthorByIdDtoInput): Promise<AuthorDtoOutput>;
    deleteAuthorById(deleteAuthorByIdDtoInput: DeleteAuthorByIdDtoInput): Promise<AuthorDtoOutput>;
}