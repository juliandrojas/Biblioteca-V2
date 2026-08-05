import { getAllBooks } from "../../../server/controllers/book.controller";
import api from "../config/axios";

export function getBooks() {
  return api.get("/books", getAllBooks);
}

export function createBook(bookData) {
  return api.post("/books/create", bookData);
}
export function getBooksByCategory(categoryId) {
  return api.get(`/books/category/${categoryId}`);
}
