import { choiceCollection, pollCollection, votesCollection } from "../database/db.js"
import dayjs from "dayjs";
import { ObjectId } from "mongodb";
import moment from "moment";

export async function postVoteById(req, res) {

    const choiceId = req.params.id;

    if (choiceId.length !== 24){
        return res.status(404).send("Id not supported: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer")
    }

    try {

        const existingChoices = await choiceCollection.findOne({ _id: ObjectId(choiceId) })

        if (!existingChoices) {
            return res.status(404).send("Id de choice não válido.")
        }

        const existingPoll = await pollCollection.findOne({ _id: ObjectId(existingChoices.pollId) })

        const currentDate = dayjs(new Date()).format("YYYY-MM-DD HH:mm")

        let isSameOrBefore = moment(currentDate).isSameOrBefore(existingPoll.expireAt)

        if (isSameOrBefore === false) {
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
}

export async function showResults(req, res, next) {

    const pollId = req.params.id

    if (pollId.length !== 24){
        return res.status(404).send("Id not supported: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer")
    }

    try {

        const poll = await pollCollection.findOne({ _id: ObjectId(pollId) })

        if(!poll){
            return res.status(404).send("Enquete inexistente!")
        }

        const choices = await choiceCollection.find({ pollId }).toArray()

        let votes = 0
        let mostVoted = 0
        let mostVotedChoice = ""

        for (let i = 0; i < choices.length; i++) {

            votes = await votesCollection.find({ choiceId: choices[i]._id.toString() }).toArray()

            if (votes.length > mostVoted) {
                mostVoted = votes.length
                mostVotedChoice = choices[i].title
            }
            
        }

        const resultBody = {
            _id: poll._id,
            title: poll.title,
            expireAt: poll.expireAt,
            results: {
                title: mostVotedChoice,
                votes: mostVoted
            }
        }

        res.status(200).send(resultBody)

    } catch (err) {
        console.log(err);
        res.status(400)
    }
}