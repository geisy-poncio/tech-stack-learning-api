import { 
    BookDtoOutput,
    CreateBookDtoInput,
    GetBookByIdDtoInput,
    UpdateBookByIdDtoInput,
    DeleteBookByIdDtoInput
 } from "../dto/bookDTO";

export interface BookRepositoryInterface{
    saveBook(createBookDtoInput: CreateBookDtoInput): Promise<BookDtoOutput>;
    getBookById(getBookByIdDtoInput: GetBookByIdDtoInput): Promise<BookDtoOutput | null>;
    getAllBooks(): Promise<BookDtoOutput[] | null>;
    updateBookById(updateBookByIdDtoInput: UpdateBookByIdDtoInput): Promise <BookDtoOutput>;
    deleteBookById(deleteBookByIdDtoInput: DeleteBookByIdDtoInput): Promise <BookDtoOutput>;
}