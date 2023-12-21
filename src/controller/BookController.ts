import { BookServiceInterface } from "../service/BookServiceInterface";
import { 
    CreateBookDtoInput,
    GetBookByIdDtoInput,
    UpdateBookByIdDtoInput,
    DeleteBookByIdDtoInput,
    GetAllBooksDtoInput
} from '../dto/bookDTO';

export class BookController{
    constructor(
        private readonly bookService: BookServiceInterface
    ){}

    async createBook(createBookDtoInput: CreateBookDtoInput) {
        console.log("BookController::createBook::Request received");
        return await this.bookService.createBook(createBookDtoInput);
    }

    async getBookById(getBookByIdDtoInput: GetBookByIdDtoInput) {
        console.log("BookController::getBookById::Request received");
        return await this.bookService.getBookById(getBookByIdDtoInput);
    }

    async getAllBooks(getAllBooksDtoInput: GetAllBooksDtoInput) {
        console.log("BookController::getAllBooks::Request received");
        return await this.bookService.getAllBooks(getAllBooksDtoInput);
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