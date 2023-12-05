import express, { ErrorRequestHandler } from "express";
import { AuthorController } from "./controller/AuthorController";
import { AuthorService } from "./service/AuthorService";
import { AuthorRepository } from "./repository/AuthorRepository";
import { BookRepository } from "./repository/BookRepository";
import { BookService } from "./service/BookService";
import { BookController } from "./controller/BookController";
import { apiStatusCode } from './util/apiStatusCode';

const app = express();

app.use(express.json());

const authorRepository = new AuthorRepository();
const authorService = new AuthorService(authorRepository);
const authorController = new AuthorController(authorService);

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository, authorRepository);
const bookController = new BookController(bookService);

app.post("/authors",  async (request, response, next) => {
    const { authorName } = request.body;

    if (authorName === undefined) {
        return response.status(400).json({
            message: "Invalid Input",
            apiStatusCode: apiStatusCode.INVALID_INPUT
        });
    }

    try {
        console.log("index::POST/authors::Sending data to create author");
        const output = await authorController.createAuthor(authorName);
        if (output.apiStatusCode === apiStatusCode.AUTHOR_EXISTS){
            return response.status(409).json({
                message: "Author already exists",
                apiStatusCode: output.apiStatusCode
            })
        }

        response.status(201).json({ 
            message: "Author created successfully",
            apiStatusCode: output.apiStatusCode,
            data: output.data
        });

    } catch (err) {
        next(err);
    }
})

app.get("/authors/:id", async (request, response, next) => {
    const authorId = request.params.id;

    try {
        console.log("index::GET/authors/:id::Request being sent");
        const output = await authorController.getAuthorById(authorId);

        if (output.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST) {
            return response.status(404).json({
                message: "Author not found",
                apiStatusCode: output.apiStatusCode
            })
        }

        response.status(200).json({ 
            message: "Author found",
            apiStatusCode: output.apiStatusCode,
            data: output.data 
        });

    } catch (err) {
        next(err);
    }
       
})

app.get("/authors", async (request, response, next) => {
    
    try {
        console.log("index::GET/authors::Request being sent");
        const output = await authorController.getAllAuthors();

        response.status(200).json({ 
            message: "Authors found",
            apiStatusCode: output.apiStatusCode,
            data: output.data 
        });

    } catch (err) {
        next(err);
    }
})

app.put("/authors/:id", async (request, response, next) => {
    const idAuthor = request.params.id;
    const { authorName } = request.body; 

    if (authorName === undefined) {
        return response.status(400).json({
            message: "Invalid Input",
            apiStatusCode: apiStatusCode.INVALID_INPUT
        });
    }

    try{
        console.log("index::PUT/authors/:id::Sending data to update author");
        const output = await authorController.updateAuthor(idAuthor, authorName);

        if (output.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST){
            return response.status(404).json({
                message: "Author not found",
                apiStatusCode: output.apiStatusCode
            })
        }
    
        response.status(200).json({ 
            message: "Author updated successfully",
            apiStatusCode: output.apiStatusCode,
            data: output.data
        });

    } catch (err) {
        next(err);
    }
})

app.delete("/authors/:id", async (request, response, next) => {
    const idAuthor = request.params.id;

    try{
        console.log("index::DELETE/authors/:id::Sending data to delete author");
        const output = await authorController.deleteAuthor(idAuthor);

        if (output.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST){
            return response.status(404).json({
                message: "Author not found",
                apiStatusCode: output.apiStatusCode
            })
        }
    
        response.status(200).json({ 
            message: "Author successfully deleted",
            apiStatusCode: output.apiStatusCode,
            data: output.data
        });

    } catch (err) {
        next(err);
    }
})

app.post("/books", async (request, response, next) => {
    const { name, authorId } = request.body;

    if (name === undefined || authorId === undefined) {
        return response.status(400).json({
            message: "Invalid Input",
            apiStatusCode: apiStatusCode.INVALID_INPUT
        });
    }

    try {
        console.log("index::POST/books::Sending data to create book");
        const output = await bookController.createBook(name, authorId);

        if (output.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST){
            return response.status(404).json({
                message: "Author not found",
                apiStatusCode: output.apiStatusCode
            })
        }

        response.status(201).json({ 
            message: "Book created successfully",
            apiStatusCode: output.apiStatusCode,
            data: output.data
        });

    } catch (err) {
        next(err);
    }
})

app.get("/books/:id", async (request, response, next) => {
    const bookId = request.params.id;

    try {
        console.log("index::GET/books/:id::Request being sent");
        const output = await bookController.getBookById(bookId);

        if (output.apiStatusCode === apiStatusCode.BOOK_DOES_NOT_EXIST) {
            return response.status(404).json({
                message: "Book not found",
                apiStatusCode: output.apiStatusCode
            })
        }

        response.status(200).json({
            message: "Book found",
            apiStatusCode: output.apiStatusCode,
            data: output.data
        });

    } catch (err) {
        next(err);
    }
})

app.get("/books", async (request, response, next) => {
    try {
        console.log("index::GET/books::Request being sent"); 
        const output = await bookController.getAllBooks();

        response.status(200).json({
            message: "Books found",
            apiStatusCode: output.apiStatusCode,
            data: output.data
        });
        
    } catch (err) {
        next(err);
    }
})

app.put("/books/:id", async (request, response, next) => {
    const bookId = request.params.id
    const {name, authorId} = request.body;
    
    if (!name && !authorId) {
        return response.status(400).json({
            message: "Invalid Input",
            apiStatusCode: apiStatusCode.INVALID_INPUT
        });    
    }

    try{
        console.log("index::PUT/books/:id::Request being sent");
        const output = await bookController.updateBook(bookId, name, authorId);

        if (output.apiStatusCode === apiStatusCode.BOOK_DOES_NOT_EXIST) {
            return response.status(404).json({
                message: "Book not found",
                apiStatusCode: output.apiStatusCode
            })
        }

        if (output.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST) {
            return response.status(404).json({
                message: "Author not found",
                apiStatusCode: output.apiStatusCode
            })
        }

        response.status(200).json({
            message: "Book updated successfully",
            apiStatusCode: output.apiStatusCode,
            data: output.data
        })
    } catch(err) {
        next(err);
    }
})

app.delete("/books/:id", async (request, response, next) => {
    const bookId = request.params.id;
    
    try{
        console.log("index::DELETE/books/:id::Request being sent");
        const output = await bookController.deleteBook(bookId);

        if (output.apiStatusCode === apiStatusCode.BOOK_DOES_NOT_EXIST) {
            return response.status(404).json({
                message: "Book not found",
                apiStatusCode: output.apiStatusCode
            })
        }

        response.status(200).json({
            message: "Book deleted successfully",
            apiStatusCode: output.apiStatusCode,
            data: output.data
        })
    } catch(err) {
        next(err);
    }
})

const errorHandler: ErrorRequestHandler = ((error, request, response, next) => {
    console.log(error.message)
    return response.status(500).json({
        message: "Internal error",
        apiStatusCode: apiStatusCode.INTERNAL_ERROR
    })
})

app.use(errorHandler);

app.listen(3000, () => console.log("Running"));
