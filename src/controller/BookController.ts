import { BookService } from "../service/BookService"; 
import { 
    CreateBookDtoInput,
    GetBookByIdDtoInput,
    UpdateBookByIdDtoInput,
    DeleteBookByIdDtoInput
} from '../dto/bookDTO';

export class BookController{
    constructor(
        private readonly bookService: BookService
    ){}

    async createBook(createBookDtoInput: CreateBookDtoInput) {
        console.log("BookController::createBook::Request received");
        return await this.bookService.createBook(createBookDtoInput);
    }

    async getBookById(getBookByIdDtoInput: GetBookByIdDtoInput) {
        console.log("BookController::getBookById::Request received");
        return await this.bookService.getBookById(getBookByIdDtoInput);
    }

    async getAllBooks() {
        console.log("BookController::getAllBooks::Request received");
        return await this.bookService.getAllBooks();
    }

    async updateBookById(updateBookByIdDtoInput: UpdateBookByIdDtoInput) {
        console.log("BookController::updateBook::Request received");
        return await this.bookService.updateBookById(updateBookByIdDtoInput);
    }

    async deleteBookById(deleteBookByIdDtoInput: DeleteBookByIdDtoInput) {
        console.log("BookController::deleteBook::Request received");
        return await this.bookService.deleteBookById(deleteBookByIdDtoInput);
    }
}