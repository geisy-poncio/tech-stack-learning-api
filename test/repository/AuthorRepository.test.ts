import { describe, expect, jest, test } from "@jest/globals";
import { AuthorRepository, prisma } from "../../src/repository/AuthorRepository"; 
import { authorEntities } from "../mocks/databaseEntities";
import { 
    CreateAuthorDtoInput, 
    DeleteAuthorByIdDtoInput, 
    GetAuthorByIdDtoInput, 
    GetAuthorByNameDtoInput, 
    UpdateAuthorByIdDtoInput 
} from "../../src/dto/authorDTO";

describe("AuthorRepository", () => {
    const authorRepository = new AuthorRepository();

    describe("saveAuthor", () => {
        const createAuthorDtoInput = new CreateAuthorDtoInput("John Doe");

        test("Should save an author", async () => {
            jest.spyOn(prisma.author, "create").mockResolvedValue(authorEntities);
            const output = await authorRepository.saveAuthor(createAuthorDtoInput);

            expect(output).toEqual(authorEntities);
        })
    })

    describe("getAuthorByName", () => {
        const getAuthorByNameDtoInput = new GetAuthorByNameDtoInput("John Doe")

        test("Should find an author by name", async () => {
            jest.spyOn(prisma.author, "findFirst").mockResolvedValue(authorEntities);
            const output = await authorRepository.getAuthorByName(getAuthorByNameDtoInput);

            expect(output).toEqual(authorEntities);
        })
    })

    describe("getAllAuthors", () => {
        const allAuthors = [
            { id: "1", name: "John Doe", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
            { id: "2", name: "Jane Doe", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null }
        ];

        test("Should list all non-deleted authors", async () => {
            jest.spyOn(prisma.author, "findMany").mockResolvedValue(allAuthors);
            const output = await authorRepository.getAllAuthors();

            expect(output).toEqual(allAuthors);
            if(output !== null) {
                expect(output.every(author => author.isDeleted === false)).toBeTruthy();
            }
        })
    })

    describe("getAuthorById", () => {
        const getAuthorByIdDtoInput = new GetAuthorByIdDtoInput("1");

        test("Should find the author by Id", async () => {
            jest.spyOn(prisma.author, "findFirst").mockResolvedValue(authorEntities);
            const output = await authorRepository.getAuthorById(getAuthorByIdDtoInput);

            expect(output).toEqual(authorEntities);
        })
    })

    describe("updateAuthorById", () => {
        const updateAuthorByIdDtoInput = new UpdateAuthorByIdDtoInput("1", "John Doe");

        test("Should update the author", async () => {
            jest.spyOn(prisma.author, "update").mockResolvedValue(authorEntities);
            const output = await authorRepository.updateAuthorById(updateAuthorByIdDtoInput);
            
            expect(output).toEqual(authorEntities);
        })
    })

    describe("deleteAuthorById", () => {
        const deleteAuthorByIdDtoInput = new DeleteAuthorByIdDtoInput("1");
        authorEntities.isDeleted = true;

        test("Should update isDeleted to true", async () => {
            jest.spyOn(prisma.author, "update").mockResolvedValue(authorEntities);
            const output = await authorRepository.deleteAuthorById(deleteAuthorByIdDtoInput);

            expect(output).toEqual(authorEntities);
        })
    })
})
