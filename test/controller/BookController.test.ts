import { describe, expect, jest, test } from "@jest/globals";
import { BookRepository } from "../../src/repository/BookRepository";
import { BookService } from "../../src/service/BookService";
import { BookController } from "../../src/controller/BookController";
import { apiStatusCode } from "../../src/util/apiStatusCode";
import { bookEntities } from "../mocks/databaseEntities";
import { Output } from "../../src/util/Output";
import { AuthorRepository } from "../../src/repository/AuthorRepository";

describe ("BookController", () => {
    const authorRepository = new AuthorRepository();
    const bookRepository = new BookRepository();
    const bookService = new BookService(bookRepository, authorRepository);
    const bookController = new BookController(bookService);

    describe("createBook", () => {
        test("Should return SUCCESS when creating a new book", async () => {
            jest.spyOn(bookService, "createBook").mockResolvedValue(new Output(apiStatusCode.SUCCESS, bookEntities));
            const output = await bookController.createBook("Jane Doe Book", "1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })

    describe("getBookById", () => {
        test("Should return SUCCESS when finding book", async () => {
            jest.spyOn(bookService, "getBookById").mockResolvedValue(new Output(apiStatusCode.SUCCESS, bookEntities));
            const output = await bookController.getBookById("1");
    
            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })

    describe("getAllBooks", () => {
        test("Should return SUCCESS when finding books", async () => {
            jest.spyOn(bookService, "getAllBooks").mockResolvedValue(new Output(apiStatusCode.SUCCESS, bookEntities));
            const output = await bookController.getAllBooks();
    
            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })

    describe("updateBook", () => {
        test("Should return SUCCESS when updating book", async () => {
            jest.spyOn(bookService, "updateBook").mockResolvedValue(new Output(apiStatusCode.SUCCESS, bookEntities));
            const output = await bookController.updateBook("1", "John Doe Book", "1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })

    describe("deleteBook", () => {
        test("Should return SUCCESS when deleting book", async () => {
            jest.spyOn(bookService, "deleteBook").mockResolvedValue(new Output(apiStatusCode.SUCCESS, bookEntities));
            const output = await bookController.deleteBook("1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })
})

