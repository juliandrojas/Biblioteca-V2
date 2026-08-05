import prisma from "../config/prisma.js";
export async function getDashboardStats() {
  const [
    totalUsers,
    totalBooks,
    totalCategories,
    totalLoans,
    totalCopies,
    availableCopies,
    booksInStock,
    booksOutOfStock,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.book.count(),
    prisma.category.count(),
    prisma.loan.count(),

    prisma.book.aggregate({
      _sum: {
        copies: true,
      },
    }),

    prisma.book.aggregate({
      _sum: {
        available: true,
      },
    }),

    prisma.book.count({
      where: {
        available: {
          gt: 0,
        },
      },
    }),

    prisma.book.count({
      where: {
        available: 0,
      },
    }),
  ]);

  return {
    totalUsers,
    totalBooks,
    totalCategories,
    totalLoans,

    totalCopies: totalCopies._sum.copies ?? 0,
    availableCopies: availableCopies._sum.available ?? 0,
    borrowedCopies:
      (totalCopies._sum.copies ?? 0) - (availableCopies._sum.available ?? 0),

    booksInStock,
    booksOutOfStock,
  };
}
