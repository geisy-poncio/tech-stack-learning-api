import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

export class AuthorRepository{
    async saveAuthor (input: {name: string, isDeleted: boolean}) {
        try {
            console.log("Saving author")
            const newAuthor = await prisma.author.create({
              data: {
                name: input.name,
                isDeleted: input.isDeleted,
              }
            });
            return newAuthor;
        } catch (error) {
            console.error("Error saving author:", error);
            throw error;
        } 
    }

    async authorByName (nameAuthor: string) {
        console.log("Looking for author");
        const authorByName = await prisma.author.findFirst({
            where: {
              name: nameAuthor,
              isDeleted: false
            }
        });
        return authorByName;
    }

    async allAuthors () {
        console.log("Looking for authors");
        const allAuthors = await prisma.author.findMany({ where: { isDeleted: false } });
        return allAuthors;
     }

    async authorById (idAuthor: string) {
        console.log("Looking for author");
        const authorById = await prisma.author.findFirst({ 
            where: { 
                id: idAuthor, 
                isDeleted: false 
            } 
        });
        return authorById;
    }

    async updateAuthor (idAuthor: string, nameAuthor: string) {
        console.log("Updating author");
        const updateAuthor = await prisma.author.update({
            where: { id: idAuthor },
            data: { 
                name: nameAuthor,
                isDeleted: false
            }
        });
        return updateAuthor;
    }

    async deleteAuthor (idAuthor: string) {
        console.log("Excluding author");
        const deleteAuthor = await prisma.author.update({
            where: { id: idAuthor },
            data: {
                isDeleted: true,
                deletedAt: new Date()
            }
        });
        return deleteAuthor;
    }
}
