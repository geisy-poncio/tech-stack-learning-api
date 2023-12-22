import { PrismaClient } from "@prisma/client";
import { AuthorRepositoryInterface } from "./AuthorRepositoryInterface";
import { 
    CreateAuthorDtoInput,
    GetAuthorByNameDtoInput,
    GetAuthorByIdDtoInput,
    UpdateAuthorByIdDtoInput,
    DeleteAuthorByIdDtoInput, 
    GetAllAuthorsDtoInput
} from "../dto/authorDTO";

export const prisma = new PrismaClient();

export class AuthorRepository implements AuthorRepositoryInterface {
    async saveAuthor(createAuthorDtoInput: CreateAuthorDtoInput) {
        try {
            console.log("AuthorRepository::saveAuthor::Saving author");
            const newAuthor = await prisma.author.create({
                data: {
                    name: createAuthorDtoInput.name
                }
            });
            return newAuthor;
        } catch (error) {
            console.error("AuthorRepository::saveAuthor::error saving author:", error);
            throw error;
        } 
    }

    async getAuthorByName(getAuthorByNameDtoInput: GetAuthorByNameDtoInput) {
        try {
            console.log("AuthorRepository::getAuthorByName::Looking for author");
            const authorByName = await prisma.author.findFirst({
                where: {
                  name: getAuthorByNameDtoInput.name,
                  isDeleted: false
                }
            });   
            return authorByName;

        } catch (error) {
            console.error("AuthorRepository::getAuthorByName::error finding author:", error);
            throw error;
        }
    }

    async getAllAuthors(getAllAuthorsDtoInput: GetAllAuthorsDtoInput) {
        try {
            console.log("AuthorRepository::getAllAuthors::Looking for authors");
            const { page, size } = getAllAuthorsDtoInput;
            
            const allAuthors = await prisma.author.findMany({ 
                skip: page * size,
                take: size,
                where: { 
                    isDeleted: false 
                } 
            });
            return allAuthors;

        } catch (error) {
            console.error("AuthorRepository::getAllAuthors::error finding authors:", error);
            throw error;
        }
     }
 
    async getAuthorById(getAuthorByIdDtoInput: GetAuthorByIdDtoInput) {
        try {
            console.log("AuthorRepository::getAuthorById::Looking for author");
            const { page, size } = getAuthorByIdDtoInput;
            
            const authorById = await prisma.author.findFirst({ 
                where: { 
                    id: getAuthorByIdDtoInput.id, 
                    isDeleted: false 
                },
                include: {
                    books: {
                        select: {
                            id: true,
                            name: true
                        },
                        skip: (page ?? 0) * (size ?? 10),
                        take: size ?? 10,
                        where: {
                          isDeleted: false,
                        }
                    }
                } 
            });
            return authorById;

        } catch (error) {
            console.error("AuthorRepository::getAuthorById::error finding author:", error);
            throw error;
        }    
    }

    async updateAuthorById(updateAuthorByIdDtoInput: UpdateAuthorByIdDtoInput) {
        try {
            console.log("AuthorRepository::updateAuthorById::Updating author");
            
            const { id, name } = updateAuthorByIdDtoInput;
    
            const updateAuthor = await prisma.author.update({
                where: { id: id },
                data: { name: name }
            });
            return updateAuthor;

        } catch (error) {
            console.error("AuthorRepository::updateAuthorById::error updating author:", error);
            throw error;
        }
    }

    async deleteAuthorById(deleteAuthorByIdDtoInput: DeleteAuthorByIdDtoInput) {
        try {
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
                                    deletedAt: new Date(),
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
    
            return await extendedPrisma.author.delete({ where: {id: deleteAuthorByIdDtoInput.id}});

        } catch (error) {
            console.error("AuthorRepository::deleteAuthorById::error when deleting author:", error);
            throw error;
        }  
    }
}