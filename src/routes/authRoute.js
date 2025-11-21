import { registerUser } from "../services/userService.js";
import { userVlidate } from "../validator/userValidator.js";
import express from 'express';

const router = express.Router();

router.post('/register', userVlidate, registerUser);

export default router;