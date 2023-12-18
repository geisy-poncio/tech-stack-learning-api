import { BookRepository } from "../repository/BookRepository";
import { apiStatusCode } from "../util/apiStatusCode";
import { Output } from "../util/Output";
import { AuthorService } from "./AuthorService";

export class BookService {
    constructor(
        private readonly bookRepository: BookRepository,
        private readonly authorService: AuthorService   
    ) {}

    async createBook(name: string, authorId: string): Promise<Output> {
        console.log("BookService::createBook::Forwarding the search to the author by id");
        const findAuthor = await this.authorService.getAuthorById({ id: authorId });

        if (findAuthor.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST) {
            console.warn("BookService::createBook::Author does not exists");
            return findAuthor;
        }

        console.log("BookService::createBook::Forwarding to save");
        const output = await this.bookRepository.saveBook({name, authorId});
        return new Output(apiStatusCode.SUCCESS, output);
    }

    async getBookById(bookId: string): Promise<Output> {
        console.log("BookService::getBookById::Forwarding the search to the book by id");
        const output = await this.bookRepository.getBookById(bookId);

        if (!output) {
            console.warn("BookService::getBookById::Book does not exists");
            return new Output(apiStatusCode.BOOK_DOES_NOT_EXIST);
        }

        return new Output(apiStatusCode.SUCCESS, output);
    } 

    async getAllBooks(): Promise<Output> {
        console.log("BookService::getAllBooks::Forwarding the search books");
        const output = await this.bookRepository.getAllBooks();
        return new Output(apiStatusCode.SUCCESS, output);
    }

    async updateBookById(bookId: string, name: string, authorId: string): Promise<Output> {
        const findBook = await this.getBookById(bookId);
        if (findBook.apiStatusCode === apiStatusCode.BOOK_DOES_NOT_EXIST) {
            return findBook;
        }

        const findAuthor = await this.authorService.getAuthorById({ id: authorId });
        if (findAuthor.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST) {
            console.warn("BookService::updateBookById::Author does not exists");
            return findAuthor;
        }

        console.log("BookService::updateBookById::Forwarding for update");
        const output = await this.bookRepository.updateBookById(bookId, name, authorId);
        return new Output(apiStatusCode.SUCCESS, output);
    }

    async deleteBookById(bookId: string): Promise<Output> {
        const findBook = await this.getBookById(bookId);
        
        if (findBook.apiStatusCode === apiStatusCode.BOOK_DOES_NOT_EXIST) {
            return findBook;
        }

        console.log("BookService::deleteBookById::Forwarding for delete");
        const output = await this.bookRepository.deleteBookById(bookId);
        return new Output(apiStatusCode.SUCCESS, output);
    }
}
