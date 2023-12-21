import { Output } from "../util/Output";
import { 
    CreateBookDtoInput, 
    DeleteBookByIdDtoInput, 
    GetAllBooksDtoInput, 
    GetBookByIdDtoInput, 
    UpdateBookByIdDtoInput
} from "../dto/bookDTO";

export interface BookServiceInterface{
    createBook(createBookDtoInput: CreateBookDtoInput): Promise<Output>;
    getBookById(getBookByIdDtoInput: GetBookByIdDtoInput): Promise<Output>;
    getAllBooks(getAllBooksDtoInput: GetAllBooksDtoInput): Promise<Output>;
    updateBookById(updateBookByIdDtoInput: UpdateBookByIdDtoInput): Promise<Output>;
    deleteBookById(deleteBookByIdDtoInput: DeleteBookByIdDtoInput): Promise<Output>;
}