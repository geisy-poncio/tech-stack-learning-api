import { describe, expect, jest, test } from "@jest/globals";
import { AuthorService } from "../src/service/AuthorService";
import { AuthorRepository } from "../src/repository/AuthorRepository";
import { AuthorController } from "../src/controller/AuthorController";
import { apiStatusCode } from "../src/util/apiStatusCode";
import { Output } from "../src/util/Output";
import { authorEntities } from "./mocks/databaseEntities";

describe("AuthorController", () => {
    const authorRepository = new AuthorRepository();
    const authorService = new AuthorService(authorRepository);
    const authorController = new AuthorController(authorService);

    describe("createAuthor", () => {
        test("Should return SUCCESS when creating a new author", async () => {
            jest.spyOn(authorService, "createAuthor").mockResolvedValue(new Output(apiStatusCode.SUCCESS, authorEntities));
            const output = await authorController.createAuthor("John Doe");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("getAuthorById", () => {
        test("Should return SUCCESS when finding author", async () => {
            jest.spyOn(authorService, "getAuthorById").mockResolvedValue(new Output(apiStatusCode.SUCCESS, authorEntities));
            const output = await authorController.getAuthorById("1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("getAllAuthors", () => {
        test("Should return SUCCESS when finding authors", async () => {
            jest.spyOn(authorService, "getAllAuthors").mockResolvedValue(new Output(apiStatusCode.SUCCESS, authorEntities));
            const output = await authorController.getAllAuthors();

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("updateAuthor", () => {
        test("Should return SUCCESS when updating author", async () => {
            jest.spyOn(authorService, "updateAuthor").mockResolvedValue(new Output(apiStatusCode.SUCCESS, authorEntities));
            const output = await authorController.updateAuthor("1", "Jane Doe");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("deleteAuthor", () => {
        test("Should return SUCCESS when deleting author", async () => {
            jest.spyOn(authorService, "deleteAuthor").mockResolvedValue(new Output(apiStatusCode.SUCCESS, authorEntities));
            const output = await authorController.deleteAuthor("1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

})
