import prisma from "../config/prisma.js";
// Lógica de acceso a lo base de datos
export const getAll = async () => {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const getById = async (id) => {
  return await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });
};

export const create = async (name) => {
  const exists = await prisma.category.findUnique({
    where: {
      name,
    },
  });

  if (exists) {
    throw new Error("La categoría ya existe.");
  }

  return await prisma.category.create({
    data: {
      name,
    },
  });
};

export const update = async (id, name) => {
  return await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
    },
  });
};

export const remove = async (id) => {
  return await prisma.category.delete({
    where: {
      id: Number(id),
    },
  });
};
