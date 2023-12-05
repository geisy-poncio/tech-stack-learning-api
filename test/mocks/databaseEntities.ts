export const authorEntities = {
    id: "1",
    name: "John Doe",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    books: []
};

export const bookEntities = {
    id: "1",
    name: "Jane Doe Book",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    authorId: "1"
};

export const bookAuthorEntities = {
    id: "1",
    name: "Jane Doe Book",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    authorId: "1",
    author: {
        id: "1",
        name: "John Doe",
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        books: []
    }
};