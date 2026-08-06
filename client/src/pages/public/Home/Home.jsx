import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getBooks } from "../../../services/bookService";
import { getCategories } from "../../../services/categoryService";
import Dashboard from "../../admin/Dashboard";
import BooksSection from "./components/BooksSection";
import CategoriesSection from "./components/CategoriesSection";
import CTA from "./components/CTA";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
export default function Home() {
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const [categoriesResponse, booksResponse, statsResponse] =
        await Promise.all([getCategories(), getBooks()]);

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
      <Hero />
      <Dashboard />
      <CategoriesSection categories={categories} />
      <BooksSection books={books} />
      <HowItWorks />
      <CTA />
    </>
  );
}
