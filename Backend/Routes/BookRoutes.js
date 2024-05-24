import express from "express";
import { checkUser } from "../Middlewares/AuthMiddleware.js";
import {
  addBook,
  getAllBooks,
  getBook,
  editBook,
  deleteBook,
} from "../Controllers/BookControllers.js";
const bookRouter = express.Router();

bookRouter.post("/add", checkUser, addBook);
bookRouter.get("/get/:id", getBook);
bookRouter.get("/all", getAllBooks);
bookRouter.put("/edit/:id", checkUser, editBook);
bookRouter.delete("/delete/:id", checkUser, deleteBook);

export default bookRouter;
