import { choiceSchema } from "../model/choiceModel.js"
import { pollCollection, choiceCollection } from "../database/db.js"
import { ObjectId } from "mongodb";

export async function choiceSchemaValidation(req, res, next) {
    
    const { title, pollId} = req.body;

    const { error } = choiceSchema.validate({title, pollId}, { abortEarly: false })

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors)
    }

    // {_id: objectId(pollId)}

    const existingPoll = await pollCollection.findOne({ _id: new ObjectId(pollId) })
    console.log(existingPoll)
    const existingChoice = await choiceCollection.findOne({title})
    console.log(existingChoice)

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