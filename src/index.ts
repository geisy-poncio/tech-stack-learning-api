import express, { ErrorRequestHandler } from "express";
import { AuthorController } from "./controller/AuthorController";
import { AuthorService } from "./service/AuthorService";
import { AuthorRepository } from "./repository/AuthorRepository";
import { apiStatusCode } from './util/apiStatusCode';

const app = express();

app.use(express.json());

const authorRepository = new AuthorRepository();
const authorService = new AuthorService(authorRepository);
const authorController = new AuthorController(authorService);

app.post("/authors",  async (request, response, next) => {
    const { authorName, isDeleted } = request.body;

    if (authorName === undefined || isDeleted === undefined) {
        return response.sendStatus(400);
    }

    try {
        console.log("Sending data to create author");
        const output = await authorController.createAuthor(authorName, isDeleted);
        if (output.apiStatusCode === apiStatusCode.AUTHOR_EXISTS){
            return response.status(409).json({
                message: "Author already exists",
                apiStatusCode: output.apiStatusCode
            })
        }

        console.log("Author creation completed");
        response.status(201).json({ 
            message: "Author created successfully",
            apiStatusCode: output.apiStatusCode,
            data: output.data
        })

    } catch (err) {
        next(err);
    }
})

app.get("/authors/:id", async (request, response, next) => {
    const idAuthor = request.params.id;

    if (idAuthor === undefined) {
        return response.sendStatus(400);
    }

    try {
        console.log("Request being sent");
        const output = await authorController.searchAuthor(idAuthor);

        if (output.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST) {
            return response.status(404).json({
                message: "Author not found",
                apiStatusCode: output.apiStatusCode
            })
        }

        console.log("Showing author");
        response.status(200).json({ 
            message: "Author found",
            apiStatusCode: output.apiStatusCode,
            data: output.data 
        })

    } catch (err) {
        next(err);
    }
       
})

app.get("/authors", async (request, response, next) => {
    
    try {
        console.log("Request being sent");
        const output = await authorController.searchAuthor();

        if (output.apiStatusCode === apiStatusCode.AUTHOR_DOES_NOT_EXIST) {
            return response.status(404).json({
                message: "No authors yet",
                apiStatusCode: output.apiStatusCode
            })
        }

        console.log("Showing authors");
        response.status(200).json({ 
            message: "Authors foundA",
            apiStatusCode: output.apiStatusCode,
            data: output.data 
        })

    } catch (err) {
        next(err);
    }
})

app.put("/authors/:id", async (request, response, next) => {
    const idAuthor = request.params.id;
    const { authorName } = request.body; 

    if (idAuthor === undefined || authorName === undefined) {
        return response.sendStatus(400)
    }

    try{
        console.log("Sending data to update author");
        const output = await authorController.updateAuthor(idAuthor, authorName);

        if (output.apiStatusCode === apiStatusCode.AUTHOR_EXISTS){
            return response.status(409).json({
                message: "Author not found",
                apiStatusCode: output.apiStatusCode
            })
        }
    
        console.log("Author update completed");
        response.status(201).json({ 
            message: "Author updated successfully",
            apiStatusCode: output.apiStatusCode,
            data: output.data
        })

    } catch (err) {
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

app.listen(3000, () => console.log("Rodando"))
