import { authenticateUser } from "../middelware/authentication.mjs";
import  express  from "express";

const router = express.Router();


router.delete('/deletcars',authenticateUser, );
router.post('/uploadcars', authenticateUser, )

export default router;

