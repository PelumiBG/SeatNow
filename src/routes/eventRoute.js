import { createEvent, deleteEvent, listAllEvent } from "../controllers/eventController.js";
import express from 'express';
import { eventInfo } from "../validator/eventValidator.js";

const router = express.Router();

router.post('/create',eventInfo, createEvent);

router.get('/list', listAllEvent);

router.delete('/delete/:id', deleteEvent);

export default router;