import { BookRepository } from "../repository/BookRepository";
import { apiStatusCode } from "../util/apiStatusCode";
import { Output } from "../util/Output";
import { AuthorRepository } from "../repository/AuthorRepository";

export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly authorRepository: AuthorRepository
    ) {}

    async createBook(name: string, authorId: string): Promise<Output> {
        console.log("BookService::createBook::Forwarding the search to the author by id");
        const findAuthor = await this.authorRepository.getAuthorById(authorId);

        if (!findAuthor) {
            console.log("BookService::createBook::Author does not exists");
            return new Output(apiStatusCode.AUTHOR_DOES_NOT_EXIST);
        }

        console.log("BookService::createBook::Forwarding to save");
        const savedBook = await this.bookRepository.saveBook({name, authorId});
        return new Output(apiStatusCode.SUCCESS, savedBook);
    }
}