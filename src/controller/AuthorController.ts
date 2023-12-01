import { AuthorService } from "../service/AuthorService";

export class AuthorController{
    constructor(
        private readonly authorService: AuthorService
    ) {}

    async createAuthor (name: string, isDeleted: boolean) {
        console.log("Request received");
        return await this.authorService.createAuthor(name, isDeleted);
    }

    async searchAuthor (idAuthor?: string){
        console.log("Request received");
        return await this.authorService.searchAuthor(idAuthor);
    }

    async updateAuthor(idAuthor: string, nameAuthor: string) {
        console.log("Request received");
        return await this.authorService.updateAuthor(idAuthor, nameAuthor);
    }
}
