import express from "express";
import { AuthorService } from "../service/AuthorService"; 
import { AuthorRepository } from "../repository/AuthorRepository"; 
import { BookRepository } from "../repository/BookRepository"; 
import { BookService } from "../service/BookService"; 
import { BookController } from "../controller/BookController"; 
import { apiStatusCode } from "../util/apiStatusCode"; 
import { 
    createBookValidator, 
    getBookByIdValidator, 
    updateBookByIdValidator, 
    deleteBookByIdValidator 
} from "../middleware/bookMiddleware"; 

import { 
    CreateBookDtoInput,
    GetBookByIdDtoInput,
    UpdateBookByIdDtoInput,
    DeleteBookByIdDtoInput
} from '../dto/bookDTO';
import { deepEqual } from "assert";

const authorRepository = new AuthorRepository();
const authorService = new AuthorService(authorRepository);

const bookRepository = new BookRepository();
const bookService = new BookService(bookRepository, authorService);
const bookController = new BookController(bookService);

const router = express.Router();

export function bookRoute() {
    router.post("/books", createBookValidator, async (request, response, next) => { 
        try {
            const createBookDtoInput = new CreateBookDtoInput(request.body.name, request.body.authorId);
            const output = await bookController.createBook(createBookDtoInput);
    
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

    router.get("/books/:id", getBookByIdValidator, async (request, response, next) => {
        try {
            const getBookByIdDtoInput = new GetBookByIdDtoInput(request.params.id);
            const output = await bookController.getBookById(getBookByIdDtoInput);
    
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
    
    router.get("/books", async (request, response, next) => {
        try {
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
    
    router.put("/books/:id", updateBookByIdValidator, async (request, response, next) => {    
        try{
            const updateBookByIdDtoInput = new UpdateBookByIdDtoInput(request.params.id, request.body.name, request.body.authorId);
            const output = await bookController.updateBookById(updateBookByIdDtoInput);
    
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
    
    router.delete("/books/:id", deleteBookByIdValidator, async (request, response, next) => {        
        try{
            const deleteBookByIdDtoInput = new DeleteBookByIdDtoInput(request.params.id);
            const output = await bookController.deleteBookById(deleteBookByIdDtoInput);
    
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

    return router;
}