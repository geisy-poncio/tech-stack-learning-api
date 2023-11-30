import { AuthorRepository } from "../repository/AuthorRepository";
import { Author } from "../author";


export class AuthorService {
    constructor(
        private readonly  authorRepository: AuthorRepository
    ) {
    }

    createAuthor(name: string, isDeleted: boolean) {
        const author =  new Author(name, isDeleted);
        console.log('Requisição recebida, sendo encaminhada para salvar', author);
        return this.authorRepository.saveAuthor(author);
    }

    searchAuthorByName (nameAuthor: string) {
        return this.authorRepository.authorByName(nameAuthor);
    }

    searchAuthor (idAuthor?: string){
        if(idAuthor === undefined){
            console.log("Encaminhando pesquisa de todos os autores");
            return this.authorRepository.allAuthors();
        } else {
            console.log("Encaminhando pesquisa de autor pelo id");
            return this.authorRepository.authorById(idAuthor);
        }
    }    
}
