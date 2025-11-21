import { userVlidate } from "../validator/userValidator.js";
import { registerAttendee } from "../controllers/registrationController.js";
import express from 'express';

const router = express.Router();

router.post('/register-event', registerAttendee);