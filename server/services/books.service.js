import prisma from "../config/prisma.js";
export const getAll = async () => {
  return await prisma.book.findMany({
    include: {
      category: true,
    },
    orderBy: {
      title: "asc",
    },
  });
};
export const create = async (bookData) => {
  const exists = await prisma.book.findUnique({
    where: {
      isbn: bookData.isbn,
    },
  });

  if (exists) {
    throw new Error("El libro ya existe.");
  }

  return await prisma.book.create({
    data: {
      title: bookData.title,
      author: bookData.author,
      isbn: bookData.isbn,
      publishedAt: Number(bookData.publishedAt),
      copies: Number(bookData.copies),
      available: Number(bookData.copies), // inicialmente todos disponibles
      imageUrl: bookData.imageUrl || null,
      categoryId: Number(bookData.categoryId),
    },
    include: {
      category: true,
    },
  });
};
export const getBooksByCategory = async (id) => {
  return await prisma.book.findMany({
    where: {
      categoryId: Number(id),
    },
    include: {
      category: true,
    },
    orderBy: {
      title: "asc",
    },
  });
};
