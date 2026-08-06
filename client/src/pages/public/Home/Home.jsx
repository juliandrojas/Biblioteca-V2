import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getBooks } from "../../../services/bookService";
import { getCategories } from "../../../services/categoryService";

import BooksSection from "./components/BooksSection";
import CategoriesSection from "./components/CategoriesSection";

export default function Home() {
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [categoriesResponse, booksResponse] = await Promise.all([
        getCategories(),
        getBooks(),
      ]);

      setCategories(categoriesResponse.data);
      setBooks(booksResponse.data);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  }, [location]);

  return (
    <>
      <CategoriesSection categories={categories} />

      <BooksSection books={books} />
    </>
  );
}
