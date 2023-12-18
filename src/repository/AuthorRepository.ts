import { PrismaClient } from "@prisma/client";
import { AuthorRepositoryInterface } from "./AuthorRepositoryInterface";

export const prisma = new PrismaClient();

export class AuthorRepository implements AuthorRepositoryInterface {
    async saveAuthor(input: {name: string}) {
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

    async getAuthorByName(nameAuthor: string) {
        console.log("AuthorRepository::getAuthorByName::Looking for author");
        const authorByName = await prisma.author.findFirst({
            where: {
              name: nameAuthor,
              isDeleted: false
            }
        });
        return authorByName;
    }

    async getAllAuthors() {
        console.log("AuthorRepository::getAllAuthors::Looking for authors");
        const allAuthors = await prisma.author.findMany({ 
            where: { 
                isDeleted: false 
            } 
        });
        return allAuthors;
     }

    async getAuthorById(authorId: string) {
        console.log("AuthorRepository::getAuthorById::Looking for author");
        const authorById = await prisma.author.findFirst({ 
            where: { 
                id: authorId, 
                isDeleted: false 
            },
            include: {
                books: {
                    where: {
                      isDeleted: false,
                    }
                }
            } 
        });
        return authorById;
    }

    async updateAuthorById(authorId: string, nameAuthor: string) {
        console.log("AuthorRepository::updateAuthorById::Updating author");
        const updateAuthor = await prisma.author.update({
            where: { id: authorId },
            data: { 
                name: nameAuthor
            }
        });
        return updateAuthor;
    }

    async deleteAuthorById(authorId: string) {
        console.log("AuthorRepository::deleteAuthorById::Excluding author");
        const extendedPrisma = prisma.$extends({
            name: "softDelete",
            query: {
                author: {
                    async delete({model, operation, args, query}){
                        return await prisma.author.update({
                            where: {id: args.where.id},
                            data: {
                                isDeleted: true,
                                books: {
                                    updateMany: {
                                        where: {authorId: args.where.id},
                                        data: {
                                            isDeleted: true,
                                            deletedAt: new Date()
                                        }
                                    }
                                }
                            },
                        })
                    }
                },
                book: {
                    async delete({model, operation, args, query}){
                        return await prisma.book.update({
                            where: args.where,
                            data: {
                                isDeleted: true,
                                deletedAt: new Date()
                            }
                        })
                    }
                }
            }
        })

        return await extendedPrisma.author.delete({ where: {id: authorId}});
    }
}