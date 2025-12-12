import { createEvent, listAttendees, updateEvent } from "../controllers/eventController.js";
import express from 'express';
import { eventInfo } from "../validator/eventValidator.js";
import { adminOnly } from "../middlewares/roleMiddleware.js";
import { deleteEvent, deleteUser, listAllEvent } from "../controllers/adminController.js";
import { protectUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/book',protectUser, adminOnly, eventInfo, createEvent);

router.put('/book/:eventId',protectUser, adminOnly, eventInfo, updateEvent)

router.get('/list',protectUser, adminOnly, listAllEvent);

router.get('/:eventId/users', protectUser, adminOnly, listAttendees);

router.delete('/book/:eventId/users', protectUser, adminOnly, deleteUser)

router.delete('/delete/:id',protectUser, adminOnly, deleteEvent);

export default router;