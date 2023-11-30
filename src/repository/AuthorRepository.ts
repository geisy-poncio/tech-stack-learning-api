import { PrismaClient } from '@prisma/client'
import { Author } from "../author";

export const prisma = new PrismaClient();

export class AuthorRepository{
    async saveAuthor (authorData: Author) {
        try {
            const newAuthor = await prisma.author.create({
              data: {
                name: authorData.name,
                isDeleted: authorData.isDeleted,
              },
            });
            return newAuthor;
        } catch (error) {
            console.error('Erro ao salvar author:', error);
            throw error;
        } 
    }

    async authorByName (nameAuthor: string) {
        console.log("Procurando autor");
        const authorByName = await prisma.author.findFirst({
            where: {
              name: nameAuthor,
              isDeleted: false
            }
        });
        return authorByName;
    }

    async allAuthors () {
        console.log("Procurando autores");
        const allAuthors = await prisma.author.findMany({ where: { isDeleted: false } });
        return allAuthors;
     }

    async authorById (idAuthor: string) {
        console.log("Procurando autor");
        const authorById = await prisma.author.findFirst({ 
            where: { 
                id: idAuthor, 
                isDeleted: false 
            } 
        });
        return authorById;
    }
}