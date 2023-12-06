import { AuthorService } from "../service/AuthorService";

export class AuthorController{
    constructor(
        private readonly authorService: AuthorService
    ) {}

    async createAuthor(name: string) {
        console.log("AuthorController::createAuthor::Request received");
        return await this.authorService.createAuthor(name);
    }

    async getAuthorById(authorId: string){
        console.log("AuthorController::getAuthorById::Request received");
        return await this.authorService.getAuthorById(authorId);
    }

    async getAllAuthors(){
        console.log("AuthorController::getAllAuthors::Request received");
        return await this.authorService.getAllAuthors();
    }

    async updateAuthorById(authorId: string, nameAuthor: string) {
        console.log("AuthorController::updateAuthorById::Request received");
        return await this.authorService.updateAuthorById(authorId, nameAuthor);
    }

    async deleteAuthorById(authorId: string) {
        console.log("AuthorController::deleteAuthorById::Request received");
        return await this.authorService.deleteAuthorById(authorId);
    }
}
