// routes/email.routes.js

import { Router } from "express";
import { sendWelcomeEmail } from "../services/email.service.js";

const router = Router();

router.get("/test", async (req, res) => {
  try {
    await sendWelcomeEmail("juliandra140201@gmail.com", "Julián");

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

export default router;
