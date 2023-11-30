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

app.listen(3000, () => console.log("Rodando"))