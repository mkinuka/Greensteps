import express from "express";
import {
  getShoppingByDate,
  uploaditems,
  deleteItem,
} from "../controllers/shoppingControllers.mjs";
import { authenticateUser } from "../middelware/authentication.mjs";

const router = express.Router();

router.get("/itemsbydate", authenticateUser, getShoppingByDate);
router.delete("/deleteitem/:id", authenticateUser, deleteItem);
router.post("/uploaditem", authenticateUser, uploaditems);

export default router;
