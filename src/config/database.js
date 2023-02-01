import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
  await mongoClient.connect();
  db = mongoClient.db();
} catch (error) {
  console.log(error, db);
}

export const pollCollection = db.collection("polls");
export const voteOptionCollection = db.collection("voteOptions");
export const voteCollection = db.collection("votes");
