import { saveFlight, fetchTodayFlights, fetchAllFlights } from "../controllers/flightController.mjs";
import { authenticateUser } from "../middelware/authentication.mjs";
import  express  from "express";
const router = express.Router();


router.post('/saveflight', authenticateUser, saveFlight)
router.get('/todayflights', authenticateUser, fetchTodayFlights)
router.get('/allflights', authenticateUser, fetchAllFlights)

export default router;