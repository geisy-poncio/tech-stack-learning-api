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

    describe ("createBook", () => {
        test("Should return SUCCESS when creating a new book", async () => {
            jest.spyOn(bookService, "createBook").mockResolvedValue(new Output(apiStatusCode.SUCCESS, bookEntities));
            const output = await bookController.createBook("Jane Doe Book", "1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })
})