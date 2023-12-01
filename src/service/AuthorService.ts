import { AuthorRepository } from "../repository/AuthorRepository";
import { apiStatusCode } from "../util/apiStatusCode";
import { Output } from "../util/output";


export class AuthorService {
    constructor(
        private readonly  authorRepository: AuthorRepository
    ) {
    }

    async createAuthor(name: string, isDeleted: boolean): Promise<Output> {
        let findAuthor = await this.authorRepository.authorByName(name);

        if (findAuthor) {
            return new Output(apiStatusCode.AUTHOR_EXISTS);
        }

        console.log("Forwarding to save");
        const savedAuthor = await this.authorRepository.saveAuthor({name, isDeleted});
        return new Output(apiStatusCode.SUCCESS, savedAuthor);
        
    }

    async searchAuthor (idAuthor?: string){
        if(idAuthor === undefined){
            console.log("Forwarding the research to all authors");
            const findAuthor = await this.authorRepository.allAuthors();
            
            if (!findAuthor) {
                return new Output(apiStatusCode.AUTHOR_DOES_NOT_EXIST);
            }

            return new Output(apiStatusCode.SUCCESS, findAuthor);
        } else {
            console.log("Forwarding the search to the author by id");
            const findAuthorById = await this.authorRepository.authorById(idAuthor);

            if (!findAuthorById) {
                return new Output(apiStatusCode.AUTHOR_DOES_NOT_EXIST);
            }

            return new Output(apiStatusCode.SUCCESS, findAuthorById);
        }
    }    

    async updateAuthor (idAuthor: string, nameAuthor: string) {
        let findAuthor = await this.authorRepository.authorById(idAuthor);
        
        if (!findAuthor) {
            return new Output(apiStatusCode.AUTHOR_DOES_NOT_EXIST);
        }
        console.log("Forwarding for update");
        const updatedAuthor = await this.authorRepository.updateAuthor(idAuthor, nameAuthor);
        return new Output(apiStatusCode.SUCCESS, updatedAuthor);
    }
}
