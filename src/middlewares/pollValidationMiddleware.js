import dayjs from "dayjs";
import { pollSchema } from "../model/pollModel.js"
import moment from "moment"


export function pollSchemaValidation(req, res, next) {

    const poll = req.body;

    const { error } = pollSchema.validate(poll, { abortEarly: false })

    if (error) {
        const errors =  error.details.map((detail) => detail.message);
        return res.status(422).send(errors)
    }
    
    next()
}

export function dateValidation(req, res, next) {

    const poll = req.body
    console.log(dayjs())

    let isSameOrBefore = moment(dayjs(new Date())).isSameOrBefore(poll.expireAt)

    console.log(isSameOrBefore)

    if ( isSameOrBefore === false ) {
        return res.status(403).send("Essa enquete já expirou!")
    }

    next()    
}