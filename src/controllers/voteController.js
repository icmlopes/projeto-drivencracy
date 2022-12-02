import { choiceCollection, pollCollection, votesCollection }  from "../database/db.js"
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import moment from  "moment";

export async function postVoteById(req, res) {

    const choiceId = req.params.id;

    try {

        const existingChoices = await choiceCollection.findOne({ _id: ObjectId(choiceId) })

        if (!existingChoices) {
            return res.status(404).send("Id de choice não válido.")
        }

        const existingPoll =  await pollCollection.findOne({_id: ObjectId(existingChoices.pollId)})

        const currentDate = dayjs(new Date()).format("YYYY-MM-DD HH:mm")
  
        let isSameOrBefore = moment(currentDate).isSameOrBefore(existingPoll.expireAt)

        console.log(isSameOrBefore)

        if ( isSameOrBefore === false ) {
            return res.status(403).send("Essa enquete já expirou!")
        }

        const voteBody = {
            createdAt: currentDate,
            choiceId: choiceId,
        }

        await votesCollection.insertOne(voteBody);
        res.status(201).send("Answer created successfully")

    } catch (err) {
        console.log(err);
        res.status(400)
    }

    return res.sendStatus(201)
}