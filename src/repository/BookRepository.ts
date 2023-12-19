import { PrismaClient } from '@prisma/client'
import { BookRepositoryInterface } from './BookRepositoryInterface';
import { 
    CreateBookDtoInput,
    GetBookByIdDtoInput,
    UpdateBookByIdDtoInput,
    DeleteBookByIdDtoInput
} from '../dto/bookDTO';

export const prisma = new PrismaClient();

export class BookRepository implements BookRepositoryInterface{
    async saveBook(createBookDtoInput: CreateBookDtoInput) {
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
    }

    async getBookById(getBookByIdDtoInput: GetBookByIdDtoInput) {
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
    }

    async getAllBooks() {
        console.log("BookRepository::getAllBook::Looking for books");
        const allBooks = await prisma.book.findMany({ 
            where: { 
                isDeleted: false 
            } 
        });
        return allBooks;
    }

    async updateBookById(updateBookByIdDtoInput: UpdateBookByIdDtoInput) {
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
    }

    async deleteBookById(deleteBookByIdDtoInput: DeleteBookByIdDtoInput) {
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
    }
}
