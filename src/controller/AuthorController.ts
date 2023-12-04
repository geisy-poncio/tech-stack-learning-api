import { AuthorService } from "../service/AuthorService";

export class AuthorController{
    constructor(
        private readonly authorService: AuthorService
    ) {}

    async createAuthor (name: string) {
        console.log("AuthorController::createAuthor::Request received");
        return await this.authorService.createAuthor(name);
    }

    async getAuthorById (authorId: string){
        console.log("AuthorController::getAuthorById::Request received");
        return await this.authorService.getAuthorById(authorId);
    }

    async getAllAuthors (){
        console.log("AuthorController::getAllAuthors::Request received");
        return await this.authorService.getAllAuthors();
    }

    async updateAuthor (authorId: string, nameAuthor: string) {
        console.log("AuthorController::updateAuthor::Request received");
        return await this.authorService.updateAuthor(authorId, nameAuthor);
    }

    async deleteAuthor (authorId: string) {
        console.log("AuthorController::deleteAuthor::Request received");
        return await this.authorService.deleteAuthor(authorId);
    }
}
