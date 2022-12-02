import { choiceCollection } from "../database/db.js"

export async function postChoice(req, res) {

    const { title, pollId } = req.body

    console.log(title, pollId)

    try {
        await choiceCollection.insertOne({ title, pollId });
        res.status(201).send("Answer created successfully")

    } catch (error) {

        console.log(error)
        res.sendStatus(500)
    }
}

export async function getPollById(req, res) {
    const id = req.params.id
    // console.log(id)

    try {

        const existingChoices = await choiceCollection.find({}).toArray()

        const pollChoices = existingChoices.filter((a) => a.pollId === id)

        // console.log(pollChoices)

        if (pollChoices.length === 0 ) {
            res.status(404).send("Enquete não encontrada!")
            return
        }

        res.send(pollChoices)

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

