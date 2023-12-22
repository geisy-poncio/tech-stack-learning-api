import { randomUUID } from "crypto";
import { 
    CreateAuthorDtoInput, 
    AuthorDtoOutput, 
    GetAuthorByNameDtoInput, 
    GetAllAuthorsDtoInput, 
    GetAuthorByIdDtoInput, 
    UpdateAuthorByIdDtoInput, 
    DeleteAuthorByIdDtoInput 
} from "../dto/authorDTO";
import { AuthorRepositoryInterface } from "./AuthorRepositoryInterface";
import { BookDtoOutput } from "../dto/bookDTO";
import { mockDbBook } from "./BookRepositoryMock";

export const mockDbAuthor = new Array<AuthorDtoOutput>;

export class AuthorRepositoryMock implements AuthorRepositoryInterface {
    async saveAuthor(createAuthorDtoInput: CreateAuthorDtoInput): Promise<AuthorDtoOutput> {
        try {
            console.log("AuthorRepositoryMock::saveAuthor::Saving author");
            const newAuthor = {
                id: randomUUID(),
                name: createAuthorDtoInput.name,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            }

            mockDbAuthor.push(newAuthor);
            return newAuthor;

        } catch (error) {
            console.error("AuthorRepositoryMock::saveAuthor::error saving author:", error);
            throw error;
        }
    }

    async getAuthorByName(getAuthorByNameDtoInput: GetAuthorByNameDtoInput): Promise<AuthorDtoOutput | null> {
        try {
            console.log("AuthorRepositoryMock::getAuthorByName::Looking for author");
            const author = await mockDbAuthor.find((obj) => obj.name == getAuthorByNameDtoInput.name);
            
            if (author) {
                return author;
            } else {
                return null;
            }

        } catch (error) {
            console.error("AuthorRepositoryMock::getAuthorByName::error finding author:", error);
            throw error;
        }
    }

    async getAllAuthors(getAllAuthorsDtoInput: GetAllAuthorsDtoInput): Promise<AuthorDtoOutput[] | null> {
        try {
            console.log("AuthorRepositoryMock::getAllAuthors::Looking for authors");
            const { page, size } = getAllAuthorsDtoInput;

            const startIndex = page * size;
            const endIndex = startIndex + size;
            const allAuthors = await mockDbAuthor
                .filter((author) => !author.isDeleted)
                .slice(startIndex, endIndex);

            return allAuthors;

        } catch (error) {
            console.error("AuthorRepositoryMock::getAllAuthors::error finding authors:", error);
            throw error;
        }
    }

    async getAuthorById(getAuthorByIdDtoInput: GetAuthorByIdDtoInput): Promise<AuthorDtoOutput | null> {
        try {
            console.log("AuthorRepositoryMock::getAuthorById::Looking for author");
            let author = await mockDbAuthor.find((obj) => obj.id == getAuthorByIdDtoInput.id);

            if (author && !author.isDeleted) {
                return author;
            } else {
                return null;
            }

        } catch (error) {
            console.error("AuthorRepositoryMock::getAuthorById::error finding author:", error);
            throw error;
        }
    }

    async updateAuthorById(updateAuthorByIdDtoInput: UpdateAuthorByIdDtoInput): Promise<AuthorDtoOutput> {
        try {
            console.log("AuthorRepositoryMock::updateAuthorById::Updating author");
            const { id, name } = updateAuthorByIdDtoInput;

            const authorIndex = await mockDbAuthor.findIndex((author) => author.id === id);

            const updatedAuthor: AuthorDtoOutput = {
                ...mockDbAuthor[authorIndex],
                name: name,
            };

            mockDbAuthor[authorIndex] = updatedAuthor;

            return updatedAuthor;

        } catch (error) {
            console.error("AuthorRepositoryMock::updateAuthorById::error updating author:", error);
            throw error; 
        }
    }

    async deleteAuthorById(deleteAuthorByIdDtoInput: DeleteAuthorByIdDtoInput): Promise<AuthorDtoOutput> {
        try {
            console.log("AuthorRepositoryMock::deleteAuthorById::Excluding author");
            const authorIndex = await mockDbAuthor.findIndex((author) => author.id === deleteAuthorByIdDtoInput.id);
            
            const softDelete: AuthorDtoOutput = {
                ...mockDbAuthor[authorIndex],
                isDeleted: true,
                deletedAt: new Date()
            }
            mockDbAuthor[authorIndex] = softDelete;

            const books = await mockDbBook.filter((book) => book.authorId === deleteAuthorByIdDtoInput.id);
            if (books) {
                books.forEach((book) => {
                    const bookIndex = mockDbBook.findIndex((book) => book.id === book.id);
                    const softDeleteBooks: BookDtoOutput = {
                        ...mockDbBook[bookIndex],
                        isDeleted: true,
                        deletedAt: new Date()
                    };
                    mockDbBook[bookIndex] = softDeleteBooks;
                });
            }
            return softDelete;
            
        } catch (error) {
            console.error("AuthorRepositoryMock::deleteAuthorById::error when deleting author:", error);
            throw error;
        }
    }

}