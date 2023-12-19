import { AuthorRepositoryInterface } from "../repository/AuthorRepositoryInterface";
import { apiStatusCode } from "../util/apiStatusCode";
import { Output } from "../util/Output";
import { 
    CreateAuthorDtoInput, 
    GetAuthorByIdDtoInput, 
    GetAuthorByNameDtoInput,
    UpdateAuthorByIdDtoInput, 
    DeleteAuthorByIdDtoInput, 
    GetAllAuthorsDtoInput
} from "../dto/authorDTO";

export class AuthorService {
    constructor(
        private readonly authorRepository: AuthorRepositoryInterface
    ) {}

    async createAuthor(createAuthorDtoInput: CreateAuthorDtoInput): Promise<Output> {
        const getAuthorByNameDtoInput = new GetAuthorByNameDtoInput(createAuthorDtoInput.name)
        const findAuthor = await this.authorRepository.getAuthorByName(getAuthorByNameDtoInput);

        if (findAuthor) {
            console.warn("AuthorService::createAuthor::Author exists");
            return new Output(apiStatusCode.AUTHOR_EXISTS);
        }

        console.log("AuthorService::createAuthor::Forwarding to save");
        const savedAuthor = await this.authorRepository.saveAuthor(createAuthorDtoInput);
        return new Output(apiStatusCode.SUCCESS, savedAuthor);   
    }

    async getAuthorById(getAuthorByIdDtoInput: GetAuthorByIdDtoInput): Promise<Output> {
        console.log("AuthorService::getAuthorById::Forwarding the search to the author by id");
        const findAuthor = await this.authorRepository.getAuthorById(getAuthorByIdDtoInput);

        if (!findAuthor) {
            console.warn("AuthorService::getAuthorById::Author does not exists");
            return new Output(apiStatusCode.AUTHOR_DOES_NOT_EXIST);
        }

        return new Output(apiStatusCode.SUCCESS, findAuthor);
    }    

    async getAllAuthors(getAllAuthorsDtoInput: GetAllAuthorsDtoInput): Promise<Output> {
        console.log("AuthorService::getAllAuthors::Forwarding the research to all authors");
        const findAuthor = await this.authorRepository.getAllAuthors(getAllAuthorsDtoInput);

        return new Output(apiStatusCode.SUCCESS, findAuthor);
    }    

    async updateAuthorById(updateAuthorByIdDtoInput: UpdateAuthorByIdDtoInput): Promise<Output> {
        const getAuthorByIdDtoInput = new GetAuthorByIdDtoInput(updateAuthorByIdDtoInput.id);
        const output = await this.getAuthorById(getAuthorByIdDtoInput);

        if (output.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST) {
            return output;
        }
        console.log("AuthorService::updateAuthorById::Forwarding for update");
        const updatedAuthor = await this.authorRepository.updateAuthorById(updateAuthorByIdDtoInput);
        return new Output(apiStatusCode.SUCCESS, updatedAuthor);
    }

    async deleteAuthorById(deleteAuthorByIdDtoInput: DeleteAuthorByIdDtoInput): Promise<Output> {
        let output = await this.getAuthorById({ id: deleteAuthorByIdDtoInput.id });

        if (output.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST) {
            return output;
        }
        console.log("AuthorService::deleteAuthorById::Forwarding for delete");
        const deleteAuthor = await this.authorRepository.deleteAuthorById(deleteAuthorByIdDtoInput);
        return new Output(apiStatusCode.SUCCESS, deleteAuthor);
    }
}
