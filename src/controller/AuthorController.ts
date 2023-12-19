import { AuthorService } from "../service/AuthorService";
import { 
    CreateAuthorDtoInput, 
    GetAuthorByIdDtoInput, 
    UpdateAuthorByIdDtoInput, 
    DeleteAuthorByIdDtoInput, 
    GetAllAuthorsDtoInput
} from "../dto/authorDTO";

export class AuthorController{
    constructor(
        private readonly authorService: AuthorService
    ) {}

    async createAuthor(createAuthorDtoInput: CreateAuthorDtoInput) {
        console.log("AuthorController::createAuthor::Request received");
        return await this.authorService.createAuthor(createAuthorDtoInput);
    }

    async getAuthorById(getAuthorByIdDtoInput: GetAuthorByIdDtoInput){
        console.log("AuthorController::getAuthorById::Request received");
        return await this.authorService.getAuthorById(getAuthorByIdDtoInput);
    }

    async getAllAuthors(getAllAuthorsDtoInput: GetAllAuthorsDtoInput){
        console.log("AuthorController::getAllAuthors::Request received");
        return await this.authorService.getAllAuthors(getAllAuthorsDtoInput);
    }

    async updateAuthorById(updateAuthorByIdDtoInput: UpdateAuthorByIdDtoInput) {
        console.log("AuthorController::updateAuthorById::Request received");
        return await this.authorService.updateAuthorById(updateAuthorByIdDtoInput);
    }

    async deleteAuthorById(deleteAuthorByIdDtoInput: DeleteAuthorByIdDtoInput) {
        console.log("AuthorController::deleteAuthorById::Request received");
        return await this.authorService.deleteAuthorById(deleteAuthorByIdDtoInput);
    }
}
