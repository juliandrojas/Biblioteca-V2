import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

// Import routes
import booksRoutes from "./routes/book.routes.js";
import categoriesRoutes from "./routes/category.routes.js";
//import indexRoutes from "./routes/index.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Use Routes
//app.use("/", indexRoutes);

app.use("/books", booksRoutes);
app.use("/categories", categoriesRoutes);
app.use("/users", userRoutes);
app.use("/admin/dashboard", dashboardRoutes);

// Solo ejecuta listen si estamos localmente (Vercel define process.env.VERCEL)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto: ", PORT);
  });
}

// Exporta la app para que Vercel pueda manejarla
export default app;
