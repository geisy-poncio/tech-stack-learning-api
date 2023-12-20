import { 
    BookDtoOutput,
    CreateBookDtoInput,
    GetBookByIdDtoInput,
    UpdateBookByIdDtoInput,
    DeleteBookByIdDtoInput,
    GetAllBooksDtoInput
 } from "../dto/bookDTO";

export interface BookRepositoryInterface{
    saveBook(createBookDtoInput: CreateBookDtoInput): Promise<BookDtoOutput>;
    getBookById(getBookByIdDtoInput: GetBookByIdDtoInput): Promise<BookDtoOutput | null>;
    getAllBooks(getAllBooksDtoInput: GetAllBooksDtoInput): Promise<BookDtoOutput[] | null>;
    updateBookById(updateBookByIdDtoInput: UpdateBookByIdDtoInput): Promise <BookDtoOutput>;
    deleteBookById(deleteBookByIdDtoInput: DeleteBookByIdDtoInput): Promise <BookDtoOutput>;
}