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
  const title = bookData.title?.trim();
  const author = bookData.author?.trim();
  const isbn = bookData.isbn?.trim() || null;
  const copies = Number(bookData.copies ?? 1);
  const available = Number(bookData.available ?? copies);
  const categoryId = Number(bookData.categoryId);

  if (!title || !author) {
    throw new Error("El título y el autor son obligatorios.");
  }

  if (!Number.isInteger(categoryId) || categoryId <= 0) {
    throw new Error("Debes seleccionar una categoría válida.");
  }

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error("La categoría seleccionada no existe.");
  }

  if (copies < 1 || available < 0 || available > copies) {
    throw new Error("Las copias y los disponibles no son válidos.");
  }

  if (isbn) {
    const exists = await prisma.book.findUnique({
      where: {
        isbn,
      },
    });

    if (exists) {
      throw new Error("El libro ya existe.");
    }
  }

  return await prisma.book.create({
    data: {
      title,
      author,
      isbn,
      publishedAt:
        bookData.publishedAt == null || bookData.publishedAt === ""
          ? null
          : Number(bookData.publishedAt),
      copies,
      available,
      imageUrl: bookData.imageUrl?.trim() || null,
      categoryId,
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
