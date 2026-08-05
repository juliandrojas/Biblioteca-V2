import * as bookService from "../services/books.service.js";
export const createBook = async (req, res) => {
  try {
    const book = await bookService.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getBooksByCategory = async (req, res) => {
  try {
    const books = await bookService.getBooksByCategory(req.params.id);

    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
