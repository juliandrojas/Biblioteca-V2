import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  login,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/create", createUser);
router.put("/:id", updateUser);
router.post("/login", login);

export default router;
