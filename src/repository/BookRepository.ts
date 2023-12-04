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
}