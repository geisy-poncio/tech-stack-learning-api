import { randomUUID } from "crypto";
import { 
    CreateBookDtoInput, 
    BookDtoOutput, 
    GetBookByIdDtoInput, 
    GetAllBooksDtoInput, 
    UpdateBookByIdDtoInput, 
    DeleteBookByIdDtoInput } from "../dto/bookDTO";
import { BookRepositoryInterface } from "./BookRepositoryInterface";

export const mockDbBook = new Array<BookDtoOutput>;

export class BookRepositoryMock implements BookRepositoryInterface {
    async saveBook(createBookDtoInput: CreateBookDtoInput): Promise<BookDtoOutput> {
        try {
            console.log("BookRepositoryMock::saveBook::Saving book");
            const newBook = {
                id: randomUUID(),
                name: createBookDtoInput.name,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                authorId: createBookDtoInput.authorId
            }

            mockDbBook.push(newBook);
            return newBook;

        } catch (error) {
            console.error("BookRepositoryMock::saveBook::error saving book:", error);
            throw error;
        }    
    }

    async getBookById(getBookByIdDtoInput: GetBookByIdDtoInput): Promise<BookDtoOutput | null> {
        try {
            console.log("BookRepositoryMock::getBookById::Looking for book");
            const book = await mockDbBook.find((obj) => obj.id == getBookByIdDtoInput.id);
            
            if (book && !book.isDeleted) {
                return book;
            } else {
                return null;
            }

        } catch (error) {
            console.error("BookRepositoryMock::getBookById::error finding book:", error);
            throw error;
        }
    }

    async getAllBooks(getAllBooksDtoInput: GetAllBooksDtoInput): Promise<BookDtoOutput[] | null> {
        try {
            console.log("BookRepositoryMock::getAllBooks::Looking for books");
            const { page, size } = getAllBooksDtoInput;

            const startIndex = page * size;
            const endIndex = startIndex + size;
            const allBooks = await mockDbBook
                .filter((book) => !book.isDeleted)
                .slice(startIndex, endIndex);

            return allBooks;

        } catch (error) {
            console.error("BookRepositoryMock::getAllBooks::error finding books:", error);
            throw error;
        }
    }

    async updateBookById(updateBookByIdDtoInput: UpdateBookByIdDtoInput): Promise<BookDtoOutput> {
        try {
            console.log("BookRepositoryMock::updateBookById::Updating book");
            const { id, name, authorId } = updateBookByIdDtoInput;

            const bookIndex = await mockDbBook.findIndex((book) => book.id === id);

            const updatedBook: BookDtoOutput = {
                ...mockDbBook[bookIndex],
                name: name !== undefined ? name : mockDbBook[bookIndex].name,
                authorId: authorId !== undefined ? authorId : mockDbBook[bookIndex].authorId,
                updatedAt: new Date()
            };

            mockDbBook[bookIndex] = updatedBook;

            return updatedBook;

        } catch (error) {
            console.error("BookRepositoryMock::updateBookById::error updating book:", error);
            throw error; 
        }    
    }

    async deleteBookById(deleteBookByIdDtoInput: DeleteBookByIdDtoInput): Promise<BookDtoOutput> {
        try {
            console.log("BookRepositoryMock::deleteBookById::Excluding book");
            const bookIndex = await mockDbBook.findIndex((book) => book.id === deleteBookByIdDtoInput.id);
            
            const softDelete: BookDtoOutput = {
                ...mockDbBook[bookIndex],
                isDeleted: true,
                deletedAt: new Date()
            }

            mockDbBook[bookIndex] = softDelete;

            return softDelete;
            
        } catch (error) {
            console.error("BookRepositoryMock::deleteBookById::error when deleting book:", error);
            throw error;
        }    
    }
}