import express from "express";
import { AuthorService } from "../service/AuthorService"; 
import { AuthorRepository } from "../repository/AuthorRepository";  
import { AuthorController } from "../controller/AuthorController";
import { apiStatusCode } from "../util/apiStatusCode"; 
import { createAuthorValidator, getAuthorByIdValidator, updateAuthorByIdValidator, deleteAuthorByIdValidator } from "../middleware/authorMiddleware";

const authorRepository = new AuthorRepository();
const authorService = new AuthorService(authorRepository);
const authorController = new AuthorController(authorService)

const router = express.Router();

export function authorRoute() {
    router.post("/authors",   createAuthorValidator, async (request, response, next) => {
        const { authorName } = request.body;

        try {
            const output = await authorController.createAuthor(authorName);
            if (output.apiStatusCode === apiStatusCode.AUTHOR_EXISTS){
                console.warn("index::createAuthor::author exists");
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
    
    router.get("/authors/:id", getAuthorByIdValidator, async (request, response, next) => {
        const authorId = request.params.id;
    
        try {
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
    
    router.get("/authors", async (request, response, next) => {
        
        try {
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
    
    router.put("/authors/:id", updateAuthorByIdValidator, async (request, response, next) => {
        const idAuthor = request.params.id;
        const { authorName } = request.body; 
 
        try{
            const output = await authorController.updateAuthorById(idAuthor, authorName);
    
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
    
    router.delete("/authors/:id", deleteAuthorByIdValidator, async (request, response, next) => {
        const idAuthor = request.params.id;
    
        try{
            const output = await authorController.deleteAuthorById(idAuthor);
    
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

    return router;
}