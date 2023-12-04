import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

export class BookRepository{
    async saveBook (input: {name: string, authorId: string}) {
        console.log("BookRepository::saveBook::Saving book");
        const newBook = await prisma.book.create({
            data: {
                name: input.name,
                author: {
                    connect: { id: input.authorId }
                }
            }
        });
        return newBook;
    }

    async getBookById (bookId: string) {
        console.log("BookRepository::getBookById::Looking for book");
        const findBook = await prisma.book.findFirst({
            where: {
                id: bookId,
                isDeleted: false
            },
            include: {
                author: true
            }
        });
        return findBook;
    }

    async getAllBooks () {
        console.log("BookRepository::getAllBook::Looking for books");
        const allBooks = await prisma.book.findMany({ 
            where: { 
                isDeleted: false 
            } 
        });
        return allBooks;
    }
}
