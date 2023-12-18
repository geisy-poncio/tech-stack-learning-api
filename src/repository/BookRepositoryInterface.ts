import { BookDtoOutput } from "../dto/bookDTO";

export interface BookRepositoryInterface{
    saveBook(input: {name: string, authorId: string}): Promise<BookDtoOutput>;
    getBookById(bookId: string): Promise<BookDtoOutput | null>;
    getAllBooks(): Promise<BookDtoOutput[] | null>;
    updateBookById(bookId: string, name?: string, authorId?: string): Promise <BookDtoOutput>;
    deleteBookById(bookId: string): Promise <BookDtoOutput>;
}