import { body } from "express-validator";

export const eventInfo = ([
    body('title').isEmpty().withMessage('Provide event title'),
    body('description').isEmpty().withMessage('Provide what the event is all about'),
    body('location').isEmpty().withMessage('Provide Event Location'),
    body('capacity').isNumeric().isEmpty().withMessage('Provide total number of attendees')
]);