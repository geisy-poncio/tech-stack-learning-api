import {describe, expect, jest, test} from "@jest/globals";
import { AuthorRepository, prisma } from "../src/repository/AuthorRepository";

describe("AuthorRepository", () => {
    const authorRepository = new AuthorRepository();
    const author = {
        id: "1",
        name: "John Doe",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        books: []
    };

    describe("saveAuthor", () => {
        test("Should save an author", async () => {
            jest.spyOn(prisma.author, "create").mockResolvedValue(author);
            const output = await authorRepository.saveAuthor({ name: "John Doe", isDeleted: false });

            expect(output).toEqual(author);
        })
    })

    describe("authorByName", () => {
        test("Should find an author by name", async () => {
            jest.spyOn(prisma.author, "findFirst").mockResolvedValue(author);
            const output = await authorRepository.authorByName("John Doe");

            expect(output).toEqual(author);
        })
    })

    describe("allAuthors", () => {
        const allAuthors = [
            { id: "1", name: "John Doe", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
            { id: "2", name: "Jane Doe", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null }
        ];

        test("Should list all non-deleted authors", async () => {
            jest.spyOn(prisma.author, "findMany").mockResolvedValue(allAuthors);
            const output = await authorRepository.allAuthors();

            expect(output).toEqual(allAuthors);
            expect(output.every(author => author.isDeleted === false)).toBeTruthy();
        })
    })

    describe("authorById", () => {
        test("Should find the author by Id", async () => {
            jest.spyOn(prisma.author, "findFirst").mockResolvedValue(author);
            const output = await authorRepository.authorById("1");

            expect(output).toEqual(author);
        })
    })

    describe("updateAuthor", () => {
        test("Should update the author", async () => {
            jest.spyOn(prisma.author, "update").mockResolvedValue(author);
            const output = await authorRepository.updateAuthor("1", "John Doe");

            expect(output).toEqual(author);
        })
    })

    describe("deleteAuthor", () => {
        const deletedAuthor = {
            id: "1",
            name: "John Doe",
            isDeleted: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: new Date(),
        };

        test("Should delete the author", async () => {
            jest.spyOn(prisma.author, "update").mockResolvedValue(deletedAuthor);
            const output = await authorRepository.updateAuthor("1", "John Doe");

            expect(output).toEqual(deletedAuthor);
        })
    })
})
