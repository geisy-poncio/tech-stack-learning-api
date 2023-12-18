import { describe, expect, jest, test } from "@jest/globals";
import { BookService } from "../../src/service/BookService";
import { BookRepositoryInterface } from "../../src/repository/BookRepositoryInterface"; 
import { apiStatusCode } from "../../src/util/apiStatusCode";
import { bookEntities } from "../mocks/databaseEntities";
import { bookAuthorEntities } from "../mocks/databaseEntities";
import { AuthorRepositoryInterface } from "../../src/repository/AuthorRepositoryInterface";
import { AuthorService } from "../../src/service/AuthorService";
import { Output } from "../../src/util/Output";
import { mock } from "jest-mock-extended";

describe("BookService", () => {
    const authorRepository = mock<AuthorRepositoryInterface>();
    const authorService = new AuthorService(authorRepository);
    const bookRepository = mock<BookRepositoryInterface>();
    const bookService = new BookService(bookRepository, authorService);

    describe("createBook", () => {
        test("Should return AUTHOR_DOES_NOT_EXIST if the author is not found", async () => {
            jest.spyOn(authorService, "getAuthorById").mockResolvedValue(new Output(apiStatusCode.AUTHOR_DOES_NOT_EXIST));
            const output = await bookService.createBook("Jane Doe Book", "1");
            
            expect(output.apiStatusCode).toEqual(apiStatusCode.AUTHOR_DOES_NOT_EXIST);
        }) 

        test("Should return SUCCESS and the book saved if there is an author", async () => {
            jest.spyOn(authorService, "getAuthorById").mockResolvedValue(new Output(apiStatusCode.SUCCESS));
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

    describe("updateBookById", () => {
        test("Should return SUCCESS and update the book", async () => {
            jest.spyOn(bookRepository, "updateBookById").mockResolvedValue(bookEntities);
            const output = await bookService.updateBookById("1", "John Doe Book", "1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })

    describe("deleteBookById", () => {
        bookEntities.isDeleted = true;

        test("Should return SUCCESS and update isDeleted to true", async () => {
            jest.spyOn(bookRepository, "deleteBookById").mockResolvedValue(bookEntities);
            const output = await bookService.deleteBookById("1");

            expect(output.apiStatusCode).toEqual(apiStatusCode.SUCCESS);
            expect(output.data).toEqual(bookEntities);
        })
    })
})