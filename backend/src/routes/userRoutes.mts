import express from "express";
import { getCurrentUser, deleteUser } from "../controllers/userControllers.mjs";
import { authenticateUser } from "../middelware/authentication.mjs";

const router = express.Router();

// GET /user/me - Get current user info
router.get("/me", authenticateUser, getCurrentUser);

// DELETE /user/delete - Delete user account
router.delete("/delete", authenticateUser, deleteUser);

export default router;
