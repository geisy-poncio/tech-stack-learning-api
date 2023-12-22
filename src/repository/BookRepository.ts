import { PrismaClient } from '@prisma/client'
import { BookRepositoryInterface } from './BookRepositoryInterface';
import { 
    CreateBookDtoInput,
    GetBookByIdDtoInput,
    UpdateBookByIdDtoInput,
    DeleteBookByIdDtoInput,
    GetAllBooksDtoInput
} from '../dto/bookDTO';

export const prisma = new PrismaClient();

export class BookRepository implements BookRepositoryInterface{
    async saveBook(createBookDtoInput: CreateBookDtoInput) {
        try {
            console.log("BookRepository::saveBook::Saving book");
            const newBook = await prisma.book.create({
                data: {
                    name: createBookDtoInput.name,
                    author: {
                        connect: { id: createBookDtoInput.authorId }
                    }
                }
            });
            return newBook;

        } catch (error) {
            console.error("BookRepository::saveBook::error saving book:", error);
            throw error;
        }
    }

    async getBookById(getBookByIdDtoInput: GetBookByIdDtoInput) {
        try {
            console.log("BookRepository::getBookById::Looking for book");
            const findBook = await prisma.book.findFirst({
                where: {
                    id: getBookByIdDtoInput.id,
                    isDeleted: false
                },
                include: {
                    author: true
                }
            });
            return findBook;

        } catch (error) {
            console.error("BookRepository::getBookById::error finding book:", error);
            throw error;
        }
    }

    async getAllBooks(getAllBooksDtoInput: GetAllBooksDtoInput) {
        try {
            console.log("BookRepository::getAllBook::Looking for books");
            const { page, size } = getAllBooksDtoInput;
    
            const allBooks = await prisma.book.findMany({ 
                skip: page * size,
                take: size,
                where: { 
                    isDeleted: false 
                } 
            });
            return allBooks;

        } catch (error) {
            console.error("BookRepository::getAllBooks::error finding books:", error);
            throw error;
        }
    }

    async updateBookById(updateBookByIdDtoInput: UpdateBookByIdDtoInput) {
        try {
            console.log("BookRepository::updateBookById::Updating book");
            const updateBook = await prisma.book.update({
                where: {
                    id: updateBookByIdDtoInput.id
                },
                data: {
                    name: updateBookByIdDtoInput.name,
                    authorId: updateBookByIdDtoInput.authorId
                }
            });
            return updateBook;

        } catch (error) {
            console.error("BookRepository::updateBookById::error updating book:", error);
            throw error;
        }
    }

    async deleteBookById(deleteBookByIdDtoInput: DeleteBookByIdDtoInput) {
        try {
            console.log("BookRepository::deleteBookById::Deleting book");
            const deleteBook = await prisma.book.update({
                where: {
                    id: deleteBookByIdDtoInput.id
                },
                data: {
                    isDeleted: true,
                    deletedAt: new Date()
                }
            });
            return deleteBook;

        } catch (error) {
            console.error("BookRepository::deleteBookById::error when deleting book:", error);
            throw error;
        }
    }
}
