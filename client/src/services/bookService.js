import api from "../config/axios";

export function getBooks() {
  return api.get("/books");
}

export function createBook(bookData) {
  const payload = {
    ...bookData,
    title: bookData.title?.trim(),
    author: bookData.author?.trim(),
    isbn: bookData.isbn?.trim() || null,
    publishedAt:
      bookData.publishedAt === "" || bookData.publishedAt == null
        ? null
        : Number(bookData.publishedAt),
    copies: Number(bookData.copies ?? 1),
    available: Number(bookData.available ?? bookData.copies ?? 1),
    categoryId: Number(bookData.categoryId),
    imageUrl: bookData.imageUrl?.trim() || null,
  };

  return api.post("/books", payload);
}

export function getBooksByCategory(categoryId) {
  return api.get(`/books/category/${categoryId}`);
}
