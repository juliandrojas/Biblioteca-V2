import { Router } from "express";
import {
  createBook,
  getAllBooks,
  getBooksByCategory,
} from "../controllers/book.controller.js";

const router = Router();

router.get("/", getAllBooks);
router.post("/", createBook);
router.post("/create", createBook);
router.get("/category/:id", getBooksByCategory);

export default router;
