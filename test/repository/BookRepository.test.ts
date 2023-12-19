import { describe, expect, jest, test } from "@jest/globals";
import { BookRepository, prisma } from "../../src/repository/BookRepository";
import { bookEntities } from "../mocks/databaseEntities";
import { 
    CreateBookDtoInput,
    GetBookByIdDtoInput,
    UpdateBookByIdDtoInput,
    DeleteBookByIdDtoInput
} from "../../src/dto/bookDTO";

describe("BookRepository", () => {
    const bookRepository = new BookRepository();

    describe("saveBook", () => {
        const createBookDtoInput = new CreateBookDtoInput("Jane Doe Book", "1");

        test("Should save a book", async () => {
            jest.spyOn(prisma.book, "create").mockResolvedValue(bookEntities);
            const output = await bookRepository.saveBook(createBookDtoInput);

            expect(output).toEqual(bookEntities);
        })
    })

    describe("getBookById", () => {
        const getBookByIdDtoInput = new GetBookByIdDtoInput("1");

        test("Should find the book by id", async () => {
            jest.spyOn(prisma.book, "findFirst").mockResolvedValue(bookEntities);
            const output = await bookRepository.getBookById(getBookByIdDtoInput);

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

    describe("updateBookById", () => {
        const updateBookByIdDtoInput = new UpdateBookByIdDtoInput("1", "John Doe Book", "1");

        test("Should update the book", async () => {
            jest.spyOn(prisma.book, "update").mockResolvedValue(bookEntities);
            const output = await bookRepository.updateBookById(updateBookByIdDtoInput);

            expect(output).toEqual(bookEntities);
        })
    })

    describe("deleteBookById", () => {
        bookEntities.isDeleted = true;
        const deleteBookByIdDtoInput = new DeleteBookByIdDtoInput("1");

        test("Should update isDeleted to true", async () => {
            jest.spyOn(prisma.book, "update").mockResolvedValue(bookEntities);
            const output = await bookRepository.deleteBookById(deleteBookByIdDtoInput);

            expect(output).toEqual(bookEntities);
            expect(output.isDeleted).toEqual(true);
        })
    })
})
