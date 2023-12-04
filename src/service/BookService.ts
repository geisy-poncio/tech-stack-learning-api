import { BookRepository } from "../repository/BookRepository";
import { apiStatusCode } from "../util/apiStatusCode";
import { Output } from "../util/Output";
import { AuthorRepository } from "../repository/AuthorRepository";

export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly authorRepository: AuthorRepository
    ) {}

    async createBook (name: string, authorId: string): Promise<Output> {
        console.log("BookService::createBook::Forwarding the search to the author by id");
        const findAuthor = await this.authorRepository.getAuthorById(authorId);

        if (!findAuthor) {
            console.log("BookService::createBook::Author does not exists");
            return new Output(apiStatusCode.AUTHOR_DOES_NOT_EXIST);
        }

        console.log("BookService::createBook::Forwarding to save");
        const output = await this.bookRepository.saveBook({name, authorId});
        return new Output(apiStatusCode.SUCCESS, output);
    }

    async getBookById (bookId: string): Promise<Output> {
        console.log("BookService::getBookById::Forwarding the search to the book by id");
        const output = await this.bookRepository.getBookById(bookId);

        if (!output) {
            console.log("BookService::getBookById::Book does not exists");
            return new Output(apiStatusCode.BOOK_DOES_NOT_EXIST);
        }

        return new Output(apiStatusCode.SUCCESS, output);
    } 

    async getAllBooks (): Promise<Output> {
        console.log("BookService::getAllBooks::Forwarding the search books");
        const output = await this.bookRepository.getAllBooks();
        return new Output(apiStatusCode.SUCCESS, output);
    }
}
