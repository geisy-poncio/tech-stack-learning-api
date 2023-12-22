import express from "express";
import { bookRoute } from "./route/bookRoute"; 
import { errorHandler } from "./middleware/errorHandler";
import { authorRoute } from "./route/authorRoute"; 

export const app = express();

app.use(express.json());

app.use((request, response, next) => {
    if (Buffer.isBuffer(request.body)) {
        const value = request.body.toString()
        if (value) {
            request.body = JSON.parse(value)
        }
    }
    next()
})

app.use(authorRoute());
app.use(bookRoute());
app.use(errorHandler);
