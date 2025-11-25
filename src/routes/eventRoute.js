import { createEvent, listAllEvent } from "../controllers/eventController.js";
import express from 'express';
import { eventInfo } from "../validator/eventValidator.js";

const router = express.Router();

router.post('/create',eventInfo, createEvent);

router.post('/list', listAllEvent);

export default router;