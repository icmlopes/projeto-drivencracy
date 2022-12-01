import { choiceCollection } from "../database/db.js"

export async function postChoice(req, res){

    const {title, pollId} = req.body

    try{
        await choiceCollection.insertOne({title, pollId});
        res.status(201).send("Answer created successfully")

    } catch (error){
        console.log(error)
        res.sendStatus(500)
    }
}