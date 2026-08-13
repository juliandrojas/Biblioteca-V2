import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import userRoutes from "./routes/user.routes.js";

dotenv.config();

const app = express();

// ==========================
// Middlewares
// ==========================

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// ==========================
// Routes
// ==========================

app.use("/users", userRoutes);

// ==========================
// Servidor local
// ==========================

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
}

// ==========================
// Exportar para Vercel
// ==========================

export default app;
