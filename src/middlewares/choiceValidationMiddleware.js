import { choiceSchema } from "../model/choiceModel.js"
import { pollCollection, choiceCollection } from "../database/db.js"
import { ObjectId } from "mongodb";
import moment from "moment"
import dayjs from "dayjs";

export async function choiceSchemaValidation(req, res, next) {
    
    const { title, pollId} = req.body;

    const { error } = choiceSchema.validate({title, pollId}, { abortEarly: false })

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors)
    }

    const existingPoll = await pollCollection.findOne({ _id: new ObjectId(pollId) })

    const existingChoice = await choiceCollection.findOne({title})


    if (!existingPoll) {
        res.status(404).send("Poll não existente.")
        return
    }
    if (existingChoice) {
        res.status(409).send("Resposta já existente!")
        return
    }

    next()
}

export async function dateValidation(req, res, next) {

    const { title, pollId} = req.body;

    const currentDate = dayjs(new Date()).format("YYYY-MM-DD HH:mm")

    const findPoll = await pollCollection.findOne({ _id: new ObjectId(pollId) })
  
    let isSameOrBefore = moment(currentDate).isSameOrBefore(findPoll.expireAt)

    console.log(isSameOrBefore)

    if ( isSameOrBefore === false ) {
        return res.status(403).send("Essa enquete já expirou!")
    }

    next()    
}