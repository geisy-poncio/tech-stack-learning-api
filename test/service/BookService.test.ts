import { describe, expect, jest, test } from "@jest/globals";
import { BookService } from "../../src/service/BookService";
import { BookRepository } from "../../src/repository/BookRepository";
import { apiStatusCode } from "../../src/util/apiStatusCode";
import { bookEntities } from "../mocks/databaseEntities";
import { authorEntities } from "../mocks/databaseEntities";
import { bookAuthorEntities } from "../mocks/databaseEntities";
import { AuthorRepository } from "../../src/repository/AuthorRepository";

describe("BookService", () => {
    const authorRepository = new AuthorRepository();
    const bookRepository = new BookRepository();
    const bookService = new BookService(bookRepository, authorRepository);

    describe("createBook", () => {
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

    describe("getBookById", () => {
        test("Should return BOOK_DOES_NOT_EXIST if the book is not found", async () => {
            jest.spyOn(bookRepository, "getBookById").mockResolvedValue(null);
            const output = await bookService.getBookById("1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.BOOK_DOES_NOT_EXIST);
        })

        test("Should return SUCCESS and the book if book is found", async () => {
            jest.spyOn(bookRepository, "getBookById").mockResolvedValue(bookAuthorEntities);
            const output = await bookService.getBookById("1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookAuthorEntities);
        })
    })

    describe("getAllBooks", () => {
        const allBooks = [
            { id: "1", name: "John Doe Book", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null, authorId: "1"},
            { id: "2", name: "Jane Doe Book", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null, authorId: "2"}
        ];
        test("Should return SUCCESS and all the books", async () => {
            jest.spyOn(bookRepository, "getAllBooks").mockResolvedValue(allBooks);
            const output = await bookService.getAllBooks();

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(allBooks);
        })
    })

    describe("updateBook", () => {
        test("Should return SUCCESS and update the book", async () => {
            jest.spyOn(bookRepository, "updateBook").mockResolvedValue(bookEntities);
            const output = await bookService.updateBook("1", "John Doe Book", "1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })

    describe("deleteBook", () => {
        bookEntities.isDeleted = true;

        test("Should return SUCCESS and update isDeleted to true", async () => {
            jest.spyOn(bookRepository, "deleteBook").mockResolvedValue(bookEntities);
            const output = await bookService.deleteBook("1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })
})