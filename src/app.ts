import express from "express";
import { bookRoute } from "./route/bookRoute"; 
import { errorHandler } from "./middleware/errorHandler";
import { authorRoute } from "./route/authorRoute"; 

export const app = express();

app.use(express.json());

app.use(authorRoute());
app.use(bookRoute());
app.use(errorHandler);
