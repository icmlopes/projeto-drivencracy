import { pollSchema } from "../model/pollModel.js"
import dayjs from 'dayjs';

export function pollSchemaValidation(req, res, next) {
    const { title, expireAt} = req.body;

    const createPoll = {
        title,
        expireAt: dayjs().format("YYYY-MM-DD HH:mm"),
    }

    const { error } = pollSchema.validate(createPoll, { abortEarly: false })

    if (error) {
        const errors =  error.details.map((detail) => detail.message);
        return res.status(422).send(errors)
    }

    // req.createPoll = createPoll;
    
    next()
}