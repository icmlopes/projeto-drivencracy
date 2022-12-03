import { pollCollection } from "../database/db.js"
import dayjs from 'dayjs';

export async function postPoll(req, res) {

    const poll = req.body

    if( !poll.expireAt ){
        const date = dayjs().add(30, 'day').format("YYYY-MM-DD HH:mm")
        poll.expireAt = date
    }

    try{
        await pollCollection.insertOne(poll);
        res.sendStatus(201)

    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }

    res.locals.poll = poll

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