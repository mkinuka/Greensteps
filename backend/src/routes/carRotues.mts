import { uploadCar, fetchCars, saveJourney, fetchTodayJourneys } from "../controllers/createCarscontroller.mjs";
import { authenticateUser } from "../middelware/authentication.mjs";
import  express  from "express";

const router = express.Router();


router.delete('/deletcars',authenticateUser, );
router.post('/uploadcars', authenticateUser, uploadCar )
router.get("/fetchcars",authenticateUser, fetchCars)
router.post('/savejourney', authenticateUser, saveJourney)
router.get('/todayjourneys', authenticateUser, fetchTodayJourneys)

export default router;

