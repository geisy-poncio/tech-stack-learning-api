import { 
    CreateAuthorDtoInput, 
    DeleteAuthorByIdDtoInput, 
    GetAllAuthorsDtoInput, 
    GetAuthorByIdDtoInput, 
    UpdateAuthorByIdDtoInput 
} from "../dto/authorDTO";
import { Output } from "../util/Output";

export interface AuthorServiceInterface{
    createAuthor(createAuthorDtoInput: CreateAuthorDtoInput): Promise<Output>;
    getAuthorById(getAuthorByIdDtoInput: GetAuthorByIdDtoInput): Promise<Output>;
    getAllAuthors(getAllAuthorsDtoInput: GetAllAuthorsDtoInput): Promise<Output>;
    updateAuthorById(updateAuthorByIdDtoInput: UpdateAuthorByIdDtoInput): Promise<Output>;
    deleteAuthorById(deleteAuthorByIdDtoInput: DeleteAuthorByIdDtoInput): Promise<Output>;
}