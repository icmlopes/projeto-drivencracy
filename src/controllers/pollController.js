import { pollCollection } from "../database/db.js"

export async function postPoll(req, res) {

    const poll = req.body

    try{
        await pollCollection.insertOne(poll);
        res.sendStatus(201)

    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }

} 

export async function getPool(req, res){
    try{
        const showPolls = await pollCollection.find({}).toArray()
        return res.send(showPolls)
    } catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}