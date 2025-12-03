import { registerAttendee } from "../controllers/registrationController.js";
import express from 'express';
import { registerValidator } from "../validator/registrationValidator.js";

const router = express.Router();

router.post('/register-event', registerValidator, registerAttendee);

export default router;