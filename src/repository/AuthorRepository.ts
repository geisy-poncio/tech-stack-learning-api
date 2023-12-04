import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

export class AuthorRepository{
    async saveAuthor (input: {name: string}) {
        try {
            console.log("AuthorRepository::saveAuthor::Saving author");
            const newAuthor = await prisma.author.create({
                data: {
                    name: input.name
                }
            });
            return newAuthor;
        } catch (error) {
            console.error("AuthorRepository::saveAuthor::error saving author:", error);
            throw error;
        } 
    }

    async getAuthorByName (nameAuthor: string) {
        console.log("AuthorRepository::getAuthorByName::Looking for author");
        const authorByName = await prisma.author.findFirst({
            where: {
              name: nameAuthor,
              isDeleted: false
            }
        });
        return authorByName;
    }

    async getAllAuthors () {
        console.log("AuthorRepository::getAllAuthors::Looking for authors");
        const allAuthors = await prisma.author.findMany({ where: { isDeleted: false } });
        return allAuthors;
     }

    async getAuthorById (idAuthor: string) {
        console.log("AuthorRepository::getAuthorById::Looking for author");
        const authorById = await prisma.author.findFirst({ 
            where: { 
                id: idAuthor, 
                isDeleted: false 
            } 
        });
        return authorById;
    }

    async updateAuthor (idAuthor: string, nameAuthor: string) {
        console.log("AuthorRepository::updateAuthor::Updating author");
        const updateAuthor = await prisma.author.update({
            where: { id: idAuthor },
            data: { 
                name: nameAuthor
            }
        });
        return updateAuthor;
    }

    async deleteAuthor (idAuthor: string) {
        console.log("AuthorRepository::deleteAuthor::Excluding author");
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
