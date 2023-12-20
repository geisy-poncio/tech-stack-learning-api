import { describe, expect, jest, test } from "@jest/globals";
import { AuthorService } from "../../src/service/AuthorService";
import { apiStatusCode } from "../../src/util/apiStatusCode";
import { Output } from "../../src/util/Output";
import { authorEntities } from "../mocks/databaseEntities";
import { AuthorRepositoryInterface } from "../../src/repository/AuthorRepositoryInterface";
import { mock } from "jest-mock-extended";
import { 
    CreateAuthorDtoInput, 
    GetAuthorByIdDtoInput, 
    UpdateAuthorByIdDtoInput, 
    DeleteAuthorByIdDtoInput, 
    GetAllAuthorsDtoInput
} from "../../src/dto/authorDTO";

describe("AuthorService", () => {
    const authorRepository = mock<AuthorRepositoryInterface>();
    const authorService = new AuthorService(authorRepository);

    describe("createAuthor", () => {
        const createAuthorDtoInput = new CreateAuthorDtoInput("John Doe"); 

        test("Should return AUTHOR_EXISTS if author with the same name already exists", async () => {
            jest.spyOn(authorRepository, "getAuthorByName").mockResolvedValue(authorEntities);
            const output = await authorService.createAuthor(createAuthorDtoInput);

            expect(output.apiStatusCode).toEqual(apiStatusCode.AUTHOR_EXISTS);
        })

        test("Should return SUCCESS and the saved author if author does not exist", async () => {
            jest.spyOn(authorRepository, "getAuthorByName").mockResolvedValue(null);
            jest.spyOn(authorRepository, "saveAuthor").mockResolvedValue(authorEntities);
            const output = await authorService.createAuthor(createAuthorDtoInput);

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("getAuthorById", () => {
        const getAuthorByIdDtoInput = new GetAuthorByIdDtoInput("1");

        test("Should return AUTHOR_DOES_NOT_EXIST if the author is not found", async () => {
            jest.spyOn(authorRepository, "getAuthorById").mockResolvedValue(null);
            const output = await authorService.getAuthorById(getAuthorByIdDtoInput);
            
            expect(output.apiStatusCode).toEqual(apiStatusCode.AUTHOR_DOES_NOT_EXIST);
            expect(output.data).toEqual(undefined);
        }) 

        test("Should return the author if the author is found", async () => {
            jest.spyOn(authorRepository, "getAuthorById").mockResolvedValue(authorEntities);
            const output = await authorService.getAuthorById(getAuthorByIdDtoInput);
            
            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("getAllAuthors", () => {
        const allAuthors = [
            { id: "1", name: "John Doe", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
            { id: "2", name: "Jane Doe", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null }
        ];  
        const getAllAuthorsDtoInput = new GetAllAuthorsDtoInput(0, 5);

        test("Should return all authors", async () => {
            jest.spyOn(authorRepository, "getAllAuthors").mockResolvedValue(allAuthors);
            const output = await authorService.getAllAuthors(getAllAuthorsDtoInput);
            
            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(allAuthors);
        })
    })

    describe("updateAuthorById", () => {
        const updateAuthorByIdDtoInput = new UpdateAuthorByIdDtoInput("1", "John Doe");

        test("Should update the author if the author is found", async () => {
            jest.spyOn(authorService, "getAuthorById").mockResolvedValue(new Output(apiStatusCode.SUCCESS));
            jest.spyOn(authorRepository, "updateAuthorById").mockResolvedValue(authorEntities);
            const output = await authorService.updateAuthorById(updateAuthorByIdDtoInput);

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })

    describe("deleteAuthorById", () => {
        const deleteAuthorByIdDtoInput = new DeleteAuthorByIdDtoInput("1");

        test("Should update isDeleted to true when deleting the author", async () => {
            authorEntities.isDeleted = true;
            jest.spyOn(authorService, "getAuthorById").mockResolvedValue(new Output(apiStatusCode.SUCCESS));
            jest.spyOn(authorRepository, "deleteAuthorById").mockResolvedValue(authorEntities);
            const output = await authorService.deleteAuthorById(deleteAuthorByIdDtoInput);

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(authorEntities);
        })
    })
})
