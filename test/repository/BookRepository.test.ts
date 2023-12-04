import { describe, expect, jest, test } from "@jest/globals";
import { BookRepository, prisma } from "../../src/repository/BookRepository";
import { bookEntities } from "../mocks/databaseEntities";

describe ("BookRepository", () => {
    const bookRepository = new BookRepository();

    describe ("saveBook", () => {
        test("Should save a book", async () => {
            jest.spyOn(prisma.book, "create").mockResolvedValue(bookEntities);
            const output = await bookRepository.saveBook({ name: "Jane Doe Book", authorId: "1" });

            expect(output).toEqual(bookEntities);
        })
    })
})

