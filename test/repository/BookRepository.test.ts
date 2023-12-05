import { describe, expect, jest, test } from "@jest/globals";
import { BookRepository, prisma } from "../../src/repository/BookRepository";
import { bookEntities } from "../mocks/databaseEntities";

describe("BookRepository", () => {
    const bookRepository = new BookRepository();

    describe("saveBook", () => {
        test("Should save a book", async () => {
            jest.spyOn(prisma.book, "create").mockResolvedValue(bookEntities);
            const output = await bookRepository.saveBook({ name: "Jane Doe Book", authorId: "1" });

            expect(output).toEqual(bookEntities);
        })
    })

    describe("getBookById", () => {
        test("Should find the book by id", async () => {
            jest.spyOn(prisma.book, "findFirst").mockResolvedValue(bookEntities);
            const output = await bookRepository.getBookById("1");

            expect(output).toEqual(bookEntities);
        })
    })

    describe("getAllBooks", () => {
        const allBooks = [
            { id: "1", name: "John Doe Book", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null, authorId: "1"},
            { id: "2", name: "Jane Doe Book", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null, authorId: "2"}
        ];

        test("Should list all non-deleted books", async () => {
            jest.spyOn(prisma.book, "findMany").mockResolvedValue(allBooks);
            const output = await bookRepository.getAllBooks();

            expect(output).toEqual(allBooks);
            expect(output.every(book => book.isDeleted === false)).toBeTruthy();
        })
    })

    describe("updateBook", () => {
        test("Should update the book", async () => {
            jest.spyOn(prisma.book, "update").mockResolvedValue(bookEntities);
            const output = await bookRepository.updateBook("1", "John Doe Book", "1");

            expect(output).toEqual(bookEntities);
        })
    })

    describe("deleteBook", () => {
        bookEntities.isDeleted = true;

        test("Should update isDeleted to true", async () => {
            jest.spyOn(prisma.book, "update").mockResolvedValue(bookEntities);
            const output = await bookRepository.deleteBook("1");

            expect(output).toEqual(bookEntities);
            expect(output.isDeleted).toEqual(true);
        })
    })
})
