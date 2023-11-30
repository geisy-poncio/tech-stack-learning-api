import { AuthorService } from "../service/AuthorService";

export class AuthorController{
    constructor(
        private readonly AuthorService: AuthorService
    ) {}

    async validateAuthor (name: string, isDeleted: boolean) {
        let findAuthor = await this.AuthorService.searchAuthorByName(name);

        if (findAuthor !== undefined ){
            console.log("Requisição cancelada")
            return true;
        }
    } 

    createAuthor (name: string, isDeleted: boolean) {
        console.log("Dados da requisição validados:", name, isDeleted);
        return this.AuthorService.createAuthor(name, isDeleted)
    }
}