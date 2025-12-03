import { createEvent } from "../controllers/eventController.js";
import express from 'express';
import { eventInfo } from "../validator/eventValidator.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";
import { deleteEvent, listAllEvent } from "../controllers/adminController.js";
import { protectUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/book',eventInfo, createEvent);

router.get('/list',protectUser, adminOnly, listAllEvent);

router.delete('/delete/:id',protectUser, adminOnly, deleteEvent);

export default router;