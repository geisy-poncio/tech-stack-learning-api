import { BookRepositoryInterface } from "../repository/BookRepositoryInterface";
import { apiStatusCode } from "../util/apiStatusCode";
import { Output } from "../util/Output";
import { AuthorService } from "./AuthorService";
import { 
    CreateBookDtoInput,
    GetBookByIdDtoInput,
    UpdateBookByIdDtoInput,
    DeleteBookByIdDtoInput
} from '../dto/bookDTO';
import { GetAuthorByIdDtoInput } from "../dto/authorDTO";

export class BookService {
    constructor(
        private readonly bookRepository: BookRepositoryInterface,
        private readonly authorService: AuthorService   
    ) {}

    async createBook(createBookDtoInput: CreateBookDtoInput): Promise<Output> {
        console.log("BookService::createBook::Forwarding the search to the author by id");
        const getAuthorByIdDtoInput = new GetAuthorByIdDtoInput(createBookDtoInput.authorId)
        const findAuthor = await this.authorService.getAuthorById(getAuthorByIdDtoInput);

        if (findAuthor.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST) {
            console.warn("BookService::createBook::Author does not exists");
            return findAuthor;
        }

        console.log("BookService::createBook::Forwarding to save");
        const output = await this.bookRepository.saveBook(createBookDtoInput);
        return new Output(apiStatusCode.SUCCESS, output);
    }

    async getBookById(getBookByIdDtoInput: GetBookByIdDtoInput): Promise<Output> {
        console.log("BookService::getBookById::Forwarding the search to the book by id");
        const output = await this.bookRepository.getBookById(getBookByIdDtoInput);

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

    async updateBookById(updateBookByIdDtoInput: UpdateBookByIdDtoInput): Promise<Output> {
        const getBookByIdDtoInput = new GetBookByIdDtoInput(updateBookByIdDtoInput.id)
        const findBook = await this.getBookById(getBookByIdDtoInput);
        
        if (findBook.apiStatusCode === apiStatusCode.BOOK_DOES_NOT_EXIST) {
            return findBook;
        }

        if (updateBookByIdDtoInput.authorId) {
            const getAuthorByIdDtoInput = new GetAuthorByIdDtoInput(updateBookByIdDtoInput.authorId);
            const findAuthor = await this.authorService.getAuthorById(getAuthorByIdDtoInput);
            
            if (findAuthor.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST) {
                console.warn("BookService::updateBookById::Author does not exists");
                return findAuthor;
            }                
        }

        console.log("BookService::updateBookById::Forwarding for update");
        const output = await this.bookRepository.updateBookById(updateBookByIdDtoInput);
        return new Output(apiStatusCode.SUCCESS, output);
    }

    async deleteBookById(deleteBookByIdDtoInput: DeleteBookByIdDtoInput): Promise<Output> {
        const getBookByIdDtoInput = new GetBookByIdDtoInput(deleteBookByIdDtoInput.id)
        const findBook = await this.getBookById(getBookByIdDtoInput);

        if (findBook.apiStatusCode === apiStatusCode.BOOK_DOES_NOT_EXIST) {
            return findBook;
        }

        console.log("BookService::deleteBookById::Forwarding for delete");
        const output = await this.bookRepository.deleteBookById(deleteBookByIdDtoInput);
        return new Output(apiStatusCode.SUCCESS, output);
    }
}
