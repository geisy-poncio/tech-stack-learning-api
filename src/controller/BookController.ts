import { BookService } from "../service/BookService"; 

export class BookController{
    constructor(
        private readonly bookService: BookService
    ){}

    async createBook(name: string, authorId: string) {
        console.log("BookController::createBook::Request received");
        return await this.bookService.createBook(name, authorId);
    }

    async getBookById(bookId: string) {
        console.log("BookController::getBookById::Request received");
        return await this.bookService.getBookById(bookId);
    }

    async getAllBooks() {
        console.log("BookController::getAllBooks::Request received");
        return await this.bookService.getAllBooks();
    }

    async updateBook(bookId: string, name: string, authorId: string) {
        console.log("BookController::updateBook::Request received");
        return await this.bookService.updateBook(bookId, name, authorId);
    }
}