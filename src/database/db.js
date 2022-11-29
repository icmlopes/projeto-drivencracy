import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config();

const mongoClient =  new MongoClient(process.env.MONGO_URI);

try{
    await mongoClient.connect();
    console.log("MongoDB working...");
} catch (err){
    console.error(err);
}

const db = mongoClient.db("drivencracy");
