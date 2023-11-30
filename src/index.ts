import express from 'express';
import { AuthorController } from "./controller/AuthorController";
import { AuthorService } from "./service/AuthorService";
import { AuthorRepository } from "./repository/AuthorRepository";

const app = express();

app.use(express.json());

const authorRepository = new AuthorRepository();
const authorService = new AuthorService(authorRepository);
const authorController = new AuthorController(authorService);

app.post("/authors", async (request, response, next) => {
    if (request.body === undefined) {
        return response.sendStatus(400);
    }

    const { authorName, isDeleted } = request.body;
    
    try {
        console.log("Validando dados");
        if (await authorController.validateAuthor(authorName, isDeleted) === true){
            return response.status(400).json("Autor já está registrado.");
        }

        console.log("Enviando dados para criar autor");
        const authorSaved = await authorController.createAuthor(authorName, isDeleted);
        console.log("Criação do autor concluída");
        response.status(201).json({ authorSaved })

    } catch (err) {
        console.log(err)
        return response.sendStatus(500)
    }
})

app.get("/authors/:id", async (request, response, next) => {0
    const idAuthor = request.params.id;

    if (idAuthor === undefined) {
        return response.sendStatus(400);
    }

    console.log("Requisição sendo enviada");
    const author = await authorController.searchAuthor(idAuthor);

    if (author === null) {
        console.log("Autor não encontrado");
        return response.sendStatus(404);
    }

    console.log("Apresentando autor");
    response.status(200).json({ author })   
})

app.get("/authors", async (request, response, next) => {
    console.log("Requisição sendo enviada");
    const authors = await authorController.searchAuthor();

    if (authors === null) {
        console.log("Ainda não há autores registrados");
        return response.sendStatus(404);
    }

    console.log("Apresentando lista de autores");
    response.status(200).json({ authors })
})

app.listen(3000, () => console.log("Rodando"))