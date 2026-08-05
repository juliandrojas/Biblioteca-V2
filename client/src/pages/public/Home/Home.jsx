import { useEffect, useState } from "react";
import { getBooks } from "../../../services/bookService";
import { getCategories } from "../../../services/categoryService";

import BooksSection from "./components/BooksSection";
import CategoriesSection from "./components/CategoriesSection";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesResponse, booksResponse] = await Promise.all([
          getCategories(),
          getBooks(),
        ]);

        setCategories(categoriesResponse.data);
        setBooks(booksResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <CategoriesSection categories={categories} />
      <BooksSection books={books} />
    </>
  );
}
