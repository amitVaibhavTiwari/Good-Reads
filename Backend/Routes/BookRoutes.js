import express from "express";

import { checkUser } from "../Middlewares/AuthMiddleware.js";
import {
  addBook,
  getAllBooks,
  getBook,
} from "../Controllers/BookControllers.js";
const bookRouter = express.Router();

bookRouter.post("/add", checkUser, addBook);
bookRouter.get("/get/:id", getBook);
bookRouter.get("/all", getAllBooks);

export default bookRouter;
