import { cancelBooking, getOneBooking, registerAttendee } from "../controllers/registrationController.js";
import express from 'express';
import { registerValidator } from "../validator/registrationValidator.js";
import { userOnly } from "../middlewares/roleMiddleware.js";
import { protectUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/register-event', registerValidator, registerAttendee);

router.get('/list/:userId', protectUser, userOnly, getOneBooking);

router.post('/book/:eventId/:userId',protectUser, userOnly, cancelBooking);

export default router;