import { describe, expect, jest, test } from "@jest/globals";
import { BookService } from "../../src/service/BookService";
import { BookRepository } from "../../src/repository/BookRepository";
import { apiStatusCode } from "../../src/util/apiStatusCode";
import { bookEntities } from "../mocks/databaseEntities";
import { authorEntities } from "../mocks/databaseEntities";
import { AuthorRepository } from "../../src/repository/AuthorRepository";

describe ("BookService", () => {
    const authorRepository = new AuthorRepository();
    const bookRepository = new BookRepository();
    const bookService = new BookService(bookRepository, authorRepository);

    describe ("createBook", () => {
        test("Should return AUTHOR_DOES_NOT_EXIST if the author is not found", async () => {
            jest.spyOn(authorRepository, "getAuthorById").mockResolvedValue(null);
            const output = await bookService.createBook("Jane Doe Book", "1");
            
            expect(output.apiStatusCode).toEqual(apiStatusCode.AUTHOR_DOES_NOT_EXIST);
        }) 

        test("Should return SUCCESS and the book saved if there is an author", async () => {
            jest.spyOn(authorRepository, "getAuthorById").mockResolvedValue(authorEntities);
            jest.spyOn(bookRepository, "saveBook").mockResolvedValue(bookEntities);
            const output = await bookService.createBook("Jane Doe Book", "1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })
})