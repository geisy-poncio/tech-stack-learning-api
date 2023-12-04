import { describe, expect, jest, test } from "@jest/globals";
import { AuthorService } from "../src/service/AuthorService";
import { AuthorRepository } from "../src/repository/AuthorRepository";
import { apiStatusCode } from "../src/util/apiStatusCode";
import { Output } from "../src/util/Output";
import { authorEntities } from "./mocks/databaseEntities";

describe("AuthorService", () => {
    const authorRepository = new AuthorRepository();
    const authorService = new AuthorService(authorRepository);

    describe("createAuthor", () => {
        test("Should return AUTHOR_EXISTS if author with the same name already exists", async () => {
            jest.spyOn(authorRepository, "getAuthorByName").mockResolvedValue(authorEntities);
            const output = await authorService.createAuthor("John Doe");

            expect(output.apiStatusCode).toEqual(apiStatusCode.AUTHOR_EXISTS);
        })

        test("Should return SUCCESS and the saved author if author does not exist", async () => {
            jest.spyOn(authorRepository, "getAuthorByName").mockResolvedValue(null);
            jest.spyOn(authorRepository, "saveAuthor").mockResolvedValue(authorEntities);
            const output = await authorService.createAuthor("John Doe")

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("getAuthorById", () => {
        test("Should return AUTHOR_DOES_NOT_EXIST if the author is not found", async () => {
            jest.spyOn(authorRepository, "getAuthorById").mockResolvedValue(null);
            const output = await authorService.getAuthorById("1");
            
            expect(output.apiStatusCode).toEqual(apiStatusCode.AUTHOR_DOES_NOT_EXIST);
            expect(output.data).toEqual(undefined);
        }) 

        test("Should return the author if the author is found", async () => {
            jest.spyOn(authorRepository, "getAuthorById").mockResolvedValue(authorEntities);
            const output = await authorService.getAuthorById("1");
            
            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("getAllAuthors", () => {
        const allAuthors = [
            { id: "1", name: "John Doe", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
            { id: "2", name: "Jane Doe", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null }
        ];  

        test("Should return all authors", async () => {
            jest.spyOn(authorRepository, "getAllAuthors").mockResolvedValue(allAuthors);
            const output = await authorService.getAllAuthors();
            
            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(allAuthors);
        })
    })

    describe("updateAuthor", () => {
        test("Should update the author if the author is found", async () => {
            jest.spyOn(authorService, "getAuthorById").mockResolvedValue(new Output(apiStatusCode.SUCCESS));
            jest.spyOn(authorRepository, "updateAuthor").mockResolvedValue(authorEntities);
            const output = await authorService.updateAuthor("1", "John Doe");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("deleteAuthor", () => {
        test("Should update isDeleted to true when deleting the author", async () => {
            authorEntities.isDeleted = true;
            jest.spyOn(authorService, "getAuthorById").mockResolvedValue(new Output(apiStatusCode.SUCCESS));
            jest.spyOn(authorRepository, "deleteAuthor").mockResolvedValue(authorEntities);
            const output = await authorService.deleteAuthor("1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })
})
