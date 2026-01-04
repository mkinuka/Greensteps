import express from "express"
import { getTodaysShopping, uploaditems, deleteItem } from "../controllers/shoppingControllers.mjs";
import { authenticateUser } from "../middelware/authentication.mjs";

const router = express.Router();

router.get('/todaysshopping',authenticateUser, getTodaysShopping);
router.delete('/deleteitem/:id',authenticateUser, deleteItem);
router.post('/uploaditem', authenticateUser, uploaditems)

export default router;