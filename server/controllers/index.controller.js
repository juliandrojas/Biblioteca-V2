export const getIndex = (req, res) => {
  res.status(200).json({
    success: true,
    message: "📚 Bienvenido a la API de Biblioteca V2",
    version: "1.0.0",
    author: "Julián David Rojas Archila",
    documentation: "/api/docs",
    endpoints: {
      books: "/books",
      categories: "/categories",
      users: "/users",
      dashboard: "/admin/dashboard",
    },
    timestamp: new Date().toISOString(),
  });
};
