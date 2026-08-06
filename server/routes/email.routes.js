// routes/email.routes.js

import { Router } from "express";
import { sendWelcomeEmail } from "../services/email.service.js";

const router = Router();

router.get("/test", async (req, res) => {
  try {
    const response = await sendWelcomeEmail(
      "juliandra140201@gmail.com",
      "Julián",
    );

    console.log("Respuesta de Resend:", response);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error:", error);

    res.status(500).json({
      message: error.message,
      error,
    });
  }
});

export default router;
