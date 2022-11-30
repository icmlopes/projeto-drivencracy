import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config();

const mongoClient =  new MongoClient(process.env.MONGO_URI);

try{
    await mongoClient.connect();
    console.log("MongoDB working...");
} catch (err){
    console.log(err);
}

const db = mongoClient.db("drivencracy");
export const pollCollection = db.collection("poll");
export const choiceCollection = db.collection("choice");
export const votesCollection = db.collection("votes");