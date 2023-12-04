import {describe, expect, jest, test} from "@jest/globals";
import { AuthorRepository, prisma } from "../src/repository/AuthorRepository";
import { authorEntities } from "./mocks/databaseEntities";

describe("AuthorRepository", () => {
    const authorRepository = new AuthorRepository();

    describe("saveAuthor", () => {
        test("Should save an author", async () => {
            jest.spyOn(prisma.author, "create").mockResolvedValue(authorEntities);
            const output = await authorRepository.saveAuthor({ name: "John Doe" });

            expect(output).toEqual(authorEntities);
        })
    })

    describe("getAuthorByName", () => {
        test("Should find an author by name", async () => {
            jest.spyOn(prisma.author, "findFirst").mockResolvedValue(authorEntities);
            const output = await authorRepository.getAuthorByName("John Doe");

            expect(output).toEqual(authorEntities);
        })
    })

    describe("getAllAuthors", () => {
        const allAuthors = [
            { id: "1", name: "John Doe", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
            { id: "2", name: "Jane Doe", isDeleted: false, createdAt: new Date(), updatedAt: new Date(), deletedAt: null }
        ];

        test("Should list all non-deleted authors", async () => {
            jest.spyOn(prisma.author, "findMany").mockResolvedValue(allAuthors);
            const output = await authorRepository.getAllAuthors();

            expect(output).toEqual(allAuthors);
            expect(output.every(author => author.isDeleted === false)).toBeTruthy();
        })
    })

    describe("getAuthorById", () => {
        test("Should find the author by Id", async () => {
            jest.spyOn(prisma.author, "findFirst").mockResolvedValue(authorEntities);
            const output = await authorRepository.getAuthorById("1");

            expect(output).toEqual(authorEntities);
        })
    })

    describe("updateAuthor", () => {
        test("Should update the author", async () => {
            jest.spyOn(prisma.author, "update").mockResolvedValue(authorEntities);
            const output = await authorRepository.updateAuthor("1", "Jane Doe");
            console.log(output);
            expect(output).toEqual(authorEntities);
        })
    })

    describe("deleteAuthor", () => {
        authorEntities.isDeleted = true;
        test("Should update isDeleted to true", async () => {
            jest.spyOn(prisma.author, "update").mockResolvedValue(authorEntities);
            const output = await authorRepository.updateAuthor("1", "John Doe");

            expect(output).toEqual(authorEntities);
            expect(output.isDeleted).toEqual(true);
        })
    })
})
