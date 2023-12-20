import { describe, expect, jest, test } from "@jest/globals";
import { AuthorController } from "../../src/controller/AuthorController";
import { apiStatusCode } from "../../src/util/apiStatusCode";
import { Output } from "../../src/util/Output";
import { authorEntities } from "../mocks/databaseEntities";
import { mock } from "jest-mock-extended";
import { 
    CreateAuthorDtoInput, 
    GetAuthorByIdDtoInput, 
    UpdateAuthorByIdDtoInput, 
    DeleteAuthorByIdDtoInput, 
    GetAllAuthorsDtoInput
} from "../../src/dto/authorDTO";
import { AuthorServiceInterface } from "../../src/service/AuthorServiceInterface";

describe("AuthorController", () => {
    const authorService = mock<AuthorServiceInterface>();
    const authorController = new AuthorController(authorService);

    describe("createAuthor", () => {
        const createAuthorDtoInput = new CreateAuthorDtoInput("John Doe"); 

        test("Should return SUCCESS when creating a new author", async () => {
            jest.spyOn(authorService, "createAuthor").mockResolvedValue(new Output(apiStatusCode.SUCCESS, authorEntities));
            const output = await authorController.createAuthor(createAuthorDtoInput);

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("getAuthorById", () => {
        const getAuthorByIdDtoInput = new GetAuthorByIdDtoInput("1");

        test("Should return SUCCESS when finding author", async () => {
            jest.spyOn(authorService, "getAuthorById").mockResolvedValue(new Output(apiStatusCode.SUCCESS, authorEntities));
            const output = await authorController.getAuthorById(getAuthorByIdDtoInput);

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("getAllAuthors", () => {
        const getAllAuthorsDtoInput = new GetAllAuthorsDtoInput(0, 5);

        test("Should return SUCCESS when finding authors", async () => {
            jest.spyOn(authorService, "getAllAuthors").mockResolvedValue(new Output(apiStatusCode.SUCCESS, authorEntities));
            const output = await authorController.getAllAuthors(getAllAuthorsDtoInput);

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("updateAuthorById", () => {
        const updateAuthorByIdDtoInput = new UpdateAuthorByIdDtoInput("1", "John Doe");

        test("Should return SUCCESS when updating author", async () => {
            jest.spyOn(authorService, "updateAuthorById").mockResolvedValue(new Output(apiStatusCode.SUCCESS, authorEntities));
            const output = await authorController.updateAuthorById(updateAuthorByIdDtoInput);

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("deleteAuthorById", () => {
        const deleteAuthorByIdDtoInput = new DeleteAuthorByIdDtoInput("1");

        test("Should return SUCCESS when deleting author", async () => {
            jest.spyOn(authorService, "deleteAuthorById").mockResolvedValue(new Output(apiStatusCode.SUCCESS, authorEntities));
            const output = await authorController.deleteAuthorById(deleteAuthorByIdDtoInput);

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

})
